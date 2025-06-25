export interface FacebookAppEventsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
