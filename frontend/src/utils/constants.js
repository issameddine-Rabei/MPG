export const ROLE_SUPER_ADMIN = "Superadmin";
export const ROLE_MANAGER = "Production Manager";
export const ROLE_EMPLOYE = "Employee";

export const PROJECT_STATUS = [
  "New",
  "In progress",
  "On hold",
  "Pending review",
  "Completed",
  "Cancelled",
];

export const MACHINE_STATUS = [
  "Running", // When the machine is operating normally and performing its intended function
  "Stopped", //When the machine is not running, either due to maintenance, repair, or some other reason.
  "Faulted", //When the machine has encountered an error or fault and requires attention from maintenance personnel.
  "Idle", //When the machine is not running but is in a state of readiness, waiting for the next task or operation.
  "Setup", //When the machine is being prepared for a specific task or operation, such as adjusting tooling or changing settings.
  "Cleaning", //When the machine is being cleaned or maintained to prevent contamination or degradation of performance.
  "Offline", //When the machine is not connected to the network or is not available for use.
];

export const TASK_STATUS_READY = "Ready";
export const TASK_STATUS_DOING = "Being Done";
export const TASK_STATUS_COMPLETED = "Completed";
