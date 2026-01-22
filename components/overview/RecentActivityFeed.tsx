'use client';

import { Users, Radar, Search, Briefcase, UserCheck, AlertTriangle, CheckCircle } from 'lucide-react';

type ActivityType = 'jongeren' | 'hulpradar' | 'schuldenradar' | 'work' | 'bewindvoerders';
type ActionType = 'new_user' | 'match' | 'scan' | 'placement' | 'completed' | 'alert';

interface Activity {
  id: string;
  type: ActivityType;
  action: ActionType;
  description: string;
  timestamp: string;
  details?: string;
}

interface RecentActivityFeedProps {
  activities: Activity[];
}

const typeConfig: Record<ActivityType, { icon: React.ReactNode; color: string; bgColor: string }> = {
  jongeren: {
    icon: <Users className="w-4 h-4" />,
    color: '#3D7B4C',
    bgColor: '#3D7B4C15',
  },
  hulpradar: {
    icon: <Radar className="w-4 h-4" />,
    color: '#3B82F6',
    bgColor: '#3B82F615',
  },
  schuldenradar: {
    icon: <Search className="w-4 h-4" />,
    color: '#EF4444',
    bgColor: '#EF444415',
  },
  work: {
    icon: <Briefcase className="w-4 h-4" />,
    color: '#F59E0B',
    bgColor: '#F59E0B15',
  },
  bewindvoerders: {
    icon: <UserCheck className="w-4 h-4" />,
    color: '#8B5CF6',
    bgColor: '#8B5CF615',
  },
};

const actionIcons: Record<ActionType, React.ReactNode> = {
  new_user: <Users className="w-3 h-3" />,
  match: <CheckCircle className="w-3 h-3" />,
  scan: <Search className="w-3 h-3" />,
  placement: <Briefcase className="w-3 h-3" />,
  completed: <CheckCircle className="w-3 h-3" />,
  alert: <AlertTriangle className="w-3 h-3" />,
};

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recente Activiteit</h3>
        <span className="text-sm text-text-secondary">Vandaag</span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-border-subtle transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.bgColor, color: config.color }}
              >
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.description}
                  </p>
                  <span
                    className="flex-shrink-0"
                    style={{ color: config.color }}
                  >
                    {actionIcons[activity.action]}
                  </span>
                </div>
                {activity.details && (
                  <p className="text-xs text-text-secondary mt-0.5 truncate">{activity.details}</p>
                )}
                <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
