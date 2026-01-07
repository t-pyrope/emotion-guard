export const FormProgress = <T, V extends { radioGroupName: keyof T }>({
  options,
  values,
}: {
  options: Array<V>;
  values: T;
}) => {
  const totalSteps = options.length;
  const completedSteps = options.filter(({ radioGroupName }) =>
    Boolean(values[radioGroupName]),
  ).length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-1 sticky top-0 bg-white py-3 z-1">
      <div className="text-sm text-muted-foreground">
        Step {completedSteps} of {totalSteps}
      </div>
      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
