export interface FacebookAppEventsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initialize(options: { appId: string; clientToken: string }): Promise<void>;
  isInitialized(): Promise<{ initialized: boolean }>;
  logEvent(options: LogAppEventOptions): Promise<void>;
}

export interface LogAppEventOptions {
  eventName: FacebookStandardEventName;
  value?: number; // 对应 valueToSum，适用于金额或评分等聚合字段
  parameters?: FacebookEventParams;
}

export type FacebookStandardEventName =
  | 'ViewContent'
  | 'Search'
  | 'Rate'
  | 'CompleteRegistration'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Contact';

export interface FacebookEventParams {
  // 通用字段
  content_type?: string;
  content_id?: string;
  currency?: string;
  valueToSum?: number; // 可不传，由 value 字段统一赋值

  // 日期类
  checkin_date?: string;
  checkout_date?: string;
  departure_date?: string;
  return_date?: string;

  // 航空相关字段
  origin_airport?: string;
  destination_airport?: string;

  // 地理字段（Search）
  city?: string;
  region?: string;
  country?: string;

  // 注册类
  registration_method?: string;

  // 支付信息
  success?: string; // "true" | "false"

  // 评分类
  max_rating_value?: string;

  // 可选：通用追踪字段
  user_status?: string;
  test_mode?: string;

  // 扩展字段
  [key: string]: string | number | undefined;
}
