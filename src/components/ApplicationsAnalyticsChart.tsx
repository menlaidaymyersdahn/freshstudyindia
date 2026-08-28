import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Activity, 
  Users, 
  CheckCircle, 
  Flame, 
  Award,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { ApplicationSubmission } from '../types';

interface ApplicationsAnalyticsChartProps {
  applications: ApplicationSubmission[];
}

type ChartType = 'area' | 'bar' | 'cumulative';
type StudyLevelFilter = 'ALL' | 'Undergraduate' | 'Postgraduate' | 'Other';

interface DayData {
  dateKey: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Aug 15"
  shortWeekday: string; // e.g. "Fri"
  fullDateLabel: string; // e.g. "August 15, 2026"
  count: number;
  cumulative: number;
  applicants: { name: string; course: string; status?: string; country?: string }[];
  undergradCount: number;
  postgradCount: number;
  otherCount: number;
}

export const ApplicationsAnalyticsChart: React.FC<ApplicationsAnalyticsChartProps> = ({ applications }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [studyLevelFilter, setStudyLevelFilter] = useState<StudyLevelFilter>('ALL');
  const [isExpanded, setIsExpanded] = useState(true);

  // Compute 30-day timeline series
  const { chartData, metrics } = useMemo(() => {
    const today = new Date();
    const days: DayData[] = [];
    const dateMap = new Map<string, DayData>();

    // 1. Generate 30 contiguous days ending today
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;

      const monthName = d.toLocaleString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const shortWeekday = d.toLocaleString('en-US', { weekday: 'short' });
      const fullDateLabel = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', weekday: 'short' });

      const dayObj: DayData = {
        dateKey,
        displayDate: `${monthName} ${dayNum}`,
        shortWeekday,
        fullDateLabel,
        count: 0,
        cumulative: 0,
        applicants: [],
        undergradCount: 0,
        postgradCount: 0,
        otherCount: 0,
      };

      days.push(dayObj);
      dateMap.set(dateKey, dayObj);
    }

    // 2. Filter applications based on study level if selected
    const eligibleApps = applications.filter(app => {
      if (studyLevelFilter === 'ALL') return true;
      const level = (app.preferredStudyLevel || '').toLowerCase();
      if (studyLevelFilter === 'Undergraduate') return level.includes('undergraduate') || level.includes('bachelor');
      if (studyLevelFilter === 'Postgraduate') return level.includes('postgraduate') || level.includes('master');
      return !level.includes('undergraduate') && !level.includes('bachelor') && !level.includes('postgraduate') && !level.includes('master');
    });

    // 3. Bucket applications into the 30 days
    let totalIn30Days = 0;
    eligibleApps.forEach(app => {
      const rawDate = app.submittedAt || app.updatedAt;
      if (!rawDate) return;

      const appDate = new Date(rawDate);
      if (isNaN(appDate.getTime())) return;

      const year = appDate.getFullYear();
      const month = String(appDate.getMonth() + 1).padStart(2, '0');
      const day = String(appDate.getDate()).padStart(2, '0');
      const key = `${year}-${month}-${day}`;

      if (dateMap.has(key)) {
        const item = dateMap.get(key)!;
        item.count += 1;
        totalIn30Days += 1;

        const level = (app.preferredStudyLevel || '').toLowerCase();
        if (level.includes('undergraduate') || level.includes('bachelor')) {
          item.undergradCount += 1;
        } else if (level.includes('postgraduate') || level.includes('master')) {
          item.postgradCount += 1;
        } else {
          item.otherCount += 1;
        }

        item.applicants.push({
          name: app.fullName || 'Unnamed Applicant',
          course: app.preferredCourse || 'General Academic Program',
          status: app.status || 'Application Submitted',
          country: app.country || 'International'
        });
      }
    });

    // 4. Calculate cumulative counts & peak values
    let runningTotal = 0;
    let peakCount = 0;
    let peakDayLabel = 'N/A';

    days.forEach(day => {
      runningTotal += day.count;
      day.cumulative = runningTotal;
      if (day.count > peakCount) {
        peakCount = day.count;
        peakDayLabel = day.displayDate;
      }
    });

    // 5. Recent 7-day velocity vs previous 7-day velocity
    const last7DaysCount = days.slice(23, 30).reduce((acc, d) => acc + d.count, 0);
    const prev7DaysCount = days.slice(16, 23).reduce((acc, d) => acc + d.count, 0);
    const velocityDiff = last7DaysCount - prev7DaysCount;
    const velocityPercent = prev7DaysCount === 0 
      ? (last7DaysCount > 0 ? 100 : 0) 
      : Math.round((velocityDiff / prev7DaysCount) * 100);

    const averagePerDay = (totalIn30Days / 30).toFixed(1);

    return {
      chartData: days,
      metrics: {
        totalIn30Days,
        averagePerDay,
        peakCount,
        peakDayLabel,
        last7DaysCount,
        prev7DaysCount,
        velocityPercent,
        velocityDiff
      }
    };
  }, [applications, studyLevelFilter]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data: DayData = payload[0].payload;
      return (
        <div className="bg-slate-950/95 text-white p-3 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md text-xs min-w-[210px] space-y-2 pointer-events-none z-50">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-200">{data.fullDateLabel}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
              {data.shortWeekday}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                <span>Applications Received:</span>
              </span>
              <span className="font-bold text-white font-mono text-sm">{data.count}</span>
            </div>

            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span>30-Day Cumulative:</span>
              </span>
              <span className="font-bold text-amber-300 font-mono">{data.cumulative}</span>
            </div>

            {(data.undergradCount > 0 || data.postgradCount > 0) && (
              <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>UG: <strong className="text-slate-200">{data.undergradCount}</strong></span>
                <span>PG: <strong className="text-slate-200">{data.postgradCount}</strong></span>
                {data.otherCount > 0 && <span>Other: <strong className="text-slate-200">{data.otherCount}</strong></span>}
              </div>
            )}
          </div>

          {data.applicants.length > 0 && (
            <div className="pt-1.5 border-t border-slate-800 space-y-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Recent Submissions:</p>
              <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                {data.applicants.slice(0, 3).map((applicant, idx) => (
                  <div key={idx} className="text-[11px] bg-slate-900/80 p-1.5 rounded-lg border border-slate-800">
                    <p className="font-semibold text-blue-200 truncate">{applicant.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{applicant.course} ({applicant.country})</p>
                  </div>
                ))}
                {data.applicants.length > 3 && (
                  <p className="text-[10px] text-slate-500 text-center">+{data.applicants.length - 3} more student(s)</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#0a1b3f] to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center font-black shadow-inner shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                30-Day Applications Received Velocity
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Last 30 Days
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Daily student intake trend, intake acceleration, and rolling volume
            </p>
          </div>
        </div>

        {/* Controls: Chart Type Switcher & Expand Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type Selector */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                chartType === 'area' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Daily Area Chart"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Daily Area</span>
            </button>

            <button
              type="button"
              onClick={() => setChartType('bar')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                chartType === 'bar' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Daily Bar Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Daily Bar</span>
            </button>

            <button
              type="button"
              onClick={() => setChartType('cumulative')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                chartType === 'cumulative' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Cumulative Growth Curve"
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cumulative</span>
            </button>
          </div>

          {/* Level Filter Dropdown */}
          <select
            value={studyLevelFilter}
            onChange={(e) => setStudyLevelFilter(e.target.value as StudyLevelFilter)}
            className="px-2.5 py-1.5 rounded-xl text-xs bg-slate-800/90 text-slate-200 border border-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Study Levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate (Master's)</option>
            <option value="Other">Other Qualifications</option>
          </select>

          {/* Minimize / Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            title={isExpanded ? "Collapse Chart" : "Expand Chart"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {/* Metric 1: Total in 30 Days */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900/70 block">
                  30-Day Applications
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-blue-950 font-mono">
                    {metrics.totalIn30Days}
                  </span>
                  <span className="text-[11px] text-blue-700 font-medium">submissions</span>
                </div>
              </div>
            </div>

            {/* Metric 2: 7-Day Velocity Trend */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900/70 block">
                  Recent 7 Days
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-emerald-950 font-mono">
                    {metrics.last7DaysCount}
                  </span>
                  <span className={`text-[10px] font-bold px-1 py-0.2 rounded font-mono ${
                    metrics.velocityDiff >= 0 ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {metrics.velocityDiff >= 0 ? `+${metrics.velocityPercent}%` : `${metrics.velocityPercent}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Daily Average */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 block">
                  Daily Intake Average
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-amber-950 font-mono">
                    {metrics.averagePerDay}
                  </span>
                  <span className="text-[11px] text-amber-800 font-medium">/ day</span>
                </div>
              </div>
            </div>

            {/* Metric 4: Peak Intake Day */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900/70 block">
                  Peak Single Day
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-indigo-950 font-mono">
                    {metrics.peakCount}
                  </span>
                  <span className="text-[11px] text-indigo-700 font-medium truncate">
                    ({metrics.peakDayLabel})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recharts Canvas Container */}
          <div className="h-[260px] sm:h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="appAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    interval={3}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Daily Applications"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#appAreaGradient)"
                    activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2, fill: '#60a5fa' }}
                  />
                  {metrics.peakCount > 0 && (
                    <ReferenceLine 
                      y={metrics.peakCount} 
                      stroke="#f59e0b" 
                      strokeDasharray="4 4" 
                      label={{ value: `Peak: ${metrics.peakCount}`, fill: '#b45309', fontSize: 10, position: 'insideTopRight' }} 
                    />
                  )}
                </AreaChart>
              ) : chartType === 'bar' ? (
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    interval={3}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    name="Daily Applications"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={22}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    interval={3}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    name="Cumulative Total"
                    stroke="#d97706"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#cumulativeGradient)"
                    activeDot={{ r: 6, stroke: '#b45309', strokeWidth: 2, fill: '#fbbf24' }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Footer Info Notice */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Chart updates in real-time upon new online student submissions and CSV imports.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                <span>Active 30-Day Window: {chartData[0]?.displayDate} – {chartData[chartData.length - 1]?.displayDate}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
