
export const PROCESS_STEP_BACKGROUNDS: Partial<Record<string, string>> = {
  '01': '/bg-process-rock-digital-1.png',
  '02': '/bg-process-rock-digital-strategie.png',
  '03': '/bg-process-rock-digital-design.png',
  '04': '/bg-process-rock-digital-developpement.png',
  '05': '/bg-process-rock-digital-production.png',
  '06': '/bg-process-rock-digital-optimisation.png',
};

export function getProcessStepBackground(stepNumber: string): string | undefined {
  return PROCESS_STEP_BACKGROUNDS[stepNumber];
}
