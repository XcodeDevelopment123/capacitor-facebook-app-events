# capacitor-facebook-app-events

Facebook meta sdk for app event

## Install

```bash
npm install capacitor-facebook-app-events
npx cap sync
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`isInitialized()`](#isinitialized)
* [`logEvent(...)`](#logevent)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: FacebookInitializeOptions) => Promise<void>
```

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#facebookinitializeoptions">FacebookInitializeOptions</a></code> |

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<{ initialized: boolean; }>
```

**Returns:** <code>Promise&lt;{ initialized: boolean; }&gt;</code>

--------------------


### logEvent(...)

```typescript
logEvent(options: LogEventOptions) => Promise<void>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#logeventoptions">LogEventOptions</a></code> |

--------------------


### Interfaces


#### FacebookInitializeOptions

| Prop              | Type                |
| ----------------- | ------------------- |
| **`appId`**       | <code>string</code> |
| **`clientToken`** | <code>string</code> |


#### LogEventOptions

| Prop             | Type                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**  | <code><a href="#facebookeventname">FacebookEventName</a></code>                                                         |
| **`valueToSum`** | <code>number</code>                                                                                                     |
| **`parameters`** | <code>(<a href="#facebookeventparams">FacebookEventParams</a> & <a href="#record">Record</a>&lt;string, any&gt;)</code> |


#### FacebookEventParams

| Prop                                            | Type                    |
| ----------------------------------------------- | ----------------------- |
| **`live_streaming_prev_status`**                | <code>string</code>     |
| **`live_streaming_status`**                     | <code>string</code>     |
| **`live_streaming_error`**                      | <code>string</code>     |
| **`fb_currency`**                               | <code>string</code>     |
| **`fb_registration_method`**                    | <code>string</code>     |
| **`fb_content_type`**                           | <code>string</code>     |
| **`fb_content`**                                | <code>string</code>     |
| **`fb_content_id`**                             | <code>string</code>     |
| **`fb_search_string`**                          | <code>string</code>     |
| **`fb_success`**                                | <code>'1' \| '0'</code> |
| **`fb_max_rating_value`**                       | <code>string</code>     |
| **`fb_payment_info_available`**                 | <code>'1' \| '0'</code> |
| **`fb_num_items`**                              | <code>number</code>     |
| **`fb_level`**                                  | <code>string</code>     |
| **`fb_description`**                            | <code>string</code>     |
| **`fb_mobile_launch_source`**                   | <code>string</code>     |
| **`fb_mobile_pckg_fp`**                         | <code>string</code>     |
| **`fb_mobile_app_cert_hash`**                   | <code>string</code>     |
| **`_valueToSum`**                               | <code>number</code>     |
| **`ad_type`**                                   | <code>string</code>     |
| **`fb_order_id`**                               | <code>string</code>     |
| **`fb_product_custom_label_0`**                 | <code>string</code>     |
| **`fb_product_custom_label_1`**                 | <code>string</code>     |
| **`fb_product_custom_label_2`**                 | <code>string</code>     |
| **`fb_product_custom_label_3`**                 | <code>string</code>     |
| **`fb_product_custom_label_4`**                 | <code>string</code>     |
| **`fb_product_category`**                       | <code>string</code>     |
| **`fb_product_applink_ios_url`**                | <code>string</code>     |
| **`fb_product_applink_ios_app_store_id`**       | <code>string</code>     |
| **`fb_product_applink_ios_app_name`**           | <code>string</code>     |
| **`fb_product_applink_iphone_url`**             | <code>string</code>     |
| **`fb_product_applink_iphone_app_store_id`**    | <code>string</code>     |
| **`fb_product_applink_iphone_app_name`**        | <code>string</code>     |
| **`fb_product_applink_ipad_url`**               | <code>string</code>     |
| **`fb_product_applink_ipad_app_store_id`**      | <code>string</code>     |
| **`fb_product_applink_ipad_app_name`**          | <code>string</code>     |
| **`fb_product_applink_android_url`**            | <code>string</code>     |
| **`fb_product_applink_android_package`**        | <code>string</code>     |
| **`fb_product_applink_android_app_name`**       | <code>string</code>     |
| **`fb_product_applink_windows_phone_url`**      | <code>string</code>     |
| **`fb_product_applink_windows_phone_app_id`**   | <code>string</code>     |
| **`fb_product_applink_windows_phone_app_name`** | <code>string</code>     |


### Type Aliases


#### FacebookEventName

<code><a href="#facebookstandardevents">FacebookStandardEvents</a> | (string & {})</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


### Enums


#### FacebookStandardEvents

| Members                            | Value                                              |
| ---------------------------------- | -------------------------------------------------- |
| **`ACTIVATED_APP`**                | <code>'fb_mobile_activate_app'</code>              |
| **`DEACTIVATED_APP`**              | <code>'fb_mobile_deactivate_app'</code>            |
| **`SESSION_INTERRUPTIONS`**        | <code>'fb_mobile_app_interruptions'</code>         |
| **`TIME_BETWEEN_SESSIONS`**        | <code>'fb_mobile_time_between_sessions'</code>     |
| **`COMPLETED_REGISTRATION`**       | <code>'fb_mobile_complete_registration'</code>     |
| **`VIEWED_CONTENT`**               | <code>'fb_mobile_content_view'</code>              |
| **`SEARCHED`**                     | <code>'fb_mobile_search'</code>                    |
| **`RATED`**                        | <code>'fb_mobile_rate'</code>                      |
| **`COMPLETED_TUTORIAL`**           | <code>'fb_mobile_tutorial_completion'</code>       |
| **`PUSH_TOKEN_OBTAINED`**          | <code>'fb_mobile_obtain_push_token'</code>         |
| **`ADDED_TO_CART`**                | <code>'fb_mobile_add_to_cart'</code>               |
| **`ADDED_TO_WISHLIST`**            | <code>'fb_mobile_add_to_wishlist'</code>           |
| **`INITIATED_CHECKOUT`**           | <code>'fb_mobile_initiated_checkout'</code>        |
| **`ADDED_PAYMENT_INFO`**           | <code>'fb_mobile_add_payment_info'</code>          |
| **`PURCHASED`**                    | <code>'fb_mobile_purchase'</code>                  |
| **`ACHIEVED_LEVEL`**               | <code>'fb_mobile_level_achieved'</code>            |
| **`UNLOCKED_ACHIEVEMENT`**         | <code>'fb_mobile_achievement_unlocked'</code>      |
| **`SPENT_CREDITS`**                | <code>'fb_mobile_spent_credits'</code>             |
| **`CONTACT`**                      | <code>'Contact'</code>                             |
| **`CUSTOMIZE_PRODUCT`**            | <code>'CustomizeProduct'</code>                    |
| **`DONATE`**                       | <code>'Donate'</code>                              |
| **`FIND_LOCATION`**                | <code>'FindLocation'</code>                        |
| **`SCHEDULE`**                     | <code>'Schedule'</code>                            |
| **`START_TRIAL`**                  | <code>'StartTrial'</code>                          |
| **`SUBMIT_APPLICATION`**           | <code>'SubmitApplication'</code>                   |
| **`SUBSCRIBE`**                    | <code>'Subscribe'</code>                           |
| **`AD_IMPRESSION`**                | <code>'AdImpression'</code>                        |
| **`AD_CLICK`**                     | <code>'AdClick'</code>                             |
| **`LIVE_STREAMING_START`**         | <code>'fb_sdk_live_streaming_start'</code>         |
| **`LIVE_STREAMING_STOP`**          | <code>'fb_sdk_live_streaming_stop'</code>          |
| **`LIVE_STREAMING_PAUSE`**         | <code>'fb_sdk_live_streaming_pause'</code>         |
| **`LIVE_STREAMING_RESUME`**        | <code>'fb_sdk_live_streaming_resume'</code>        |
| **`LIVE_STREAMING_ERROR`**         | <code>'fb_sdk_live_streaming_error'</code>         |
| **`LIVE_STREAMING_UPDATE_STATUS`** | <code>'fb_sdk_live_streaming_update_status'</code> |
| **`PRODUCT_CATALOG_UPDATE`**       | <code>'fb_mobile_catalog_update'</code>            |

</docgen-api>
