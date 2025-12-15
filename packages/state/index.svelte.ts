export type AppId = "alpha" | "beta";

export class ShellState {
  // navigation / shell UI
  activeAppId = $state<AppId | null>(null);

  // shared “Team Status”
  teamMessage = $state("All systems nominal.");
  teamUpdatedBy = $state("Shell");
  teamUpdatedAt = $state(Date.now());

  // NOTE: arrow methods avoid "this" binding issues when used as callbacks  [oai_citation:3‡Svelte](https://svelte.dev/docs/svelte/%24state)
  setActiveApp = (id: AppId | null) => {
    this.activeAppId = id;
  };

  updateTeamStatus = (patch: { message?: string; updatedBy?: string }) => {
    if (patch.message !== undefined) this.teamMessage = patch.message;
    if (patch.updatedBy !== undefined) this.teamUpdatedBy = patch.updatedBy;
    this.teamUpdatedAt = Date.now();
  };

  // Optional convenience getter (fine to use in templates)
  get teamSummary() {
    return `${this.teamMessage} (by ${this.teamUpdatedBy})`;
  }
}
