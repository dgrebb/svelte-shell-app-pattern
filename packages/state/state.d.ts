export type AppId = 'alpha' | 'beta';

export declare class ShellState {
	activeAppId: AppId | null;

	teamMessage: string;
	teamUpdatedBy: string;
	teamUpdatedAt: number;
	teamUpdateCount: number;

	setActiveApp: (id: AppId | null) => void;
	updateTeamStatus: (patch: { message?: string; updatedBy?: string }) => void;
	incrementTeamUpdateCount: () => void;

	get teamSummary(): string;
}
