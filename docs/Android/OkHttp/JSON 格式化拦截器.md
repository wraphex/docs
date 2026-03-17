# OkHttp - JSON 格式化拦截器

在 Android 网络开发中，`OkHttp` 是事实上的标准 HTTP 客户端。虽然官方提供的 `HttpLoggingInterceptor` 能打印请求和响应，但在处理复杂的 JSON 数据时，压缩成一行的日志往往让人难以阅读和调试。

本文将介绍如何自定义一个拦截器，将响应体中的 JSON 数据自动格式化（Pretty Print），让日志清晰易读，同时确保不消耗原始响应流，保证业务逻辑正常执行。

## 核心实现

我们需要实现一个拦截器，其核心逻辑如下：
1. **执行请求**：调用 `chain.proceed()` 获取原始响应。
2. **判断类型**：检查 `Content-Type` 是否为 `application/json`。
3. **安全读取**：克隆响应体（Clone Body），避免消耗原始流。
4. **格式化输出**：使用 `Gson` 将 JSON 字符串美化。
5. **异常容错**：捕获解析异常，防止非标准 JSON 导致崩溃。

```java
public class PrettyJsonResponseInterceptor implements Interceptor {

    private static final Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .disableHtmlEscaping()
            .create();

    @NotNull
    @Override
    public Response intercept(@NotNull Chain chain) throws IOException {
        Request request = chain.request();
        Response response = chain.proceed(request);
        ResponseBody responseBody = response.body();
        if (responseBody == null) {
            return response;
        }

        MediaType contentType = responseBody.contentType();
        if (contentType != null && contentType.toString().contains("application/json")) {
            try {
                BufferedSource source = responseBody.source();
                source.request(Long.MAX_VALUE);
                Buffer buffer = source.getBuffer().clone();
                String bodyString = buffer.readString(StandardCharsets.UTF_8);
                if (!bodyString.isEmpty()) {
                    JsonElement jsonElement = JsonParser.parseString(bodyString);
                    String prettyJson = gson.toJson(jsonElement);
                    Timber.d("Response Body:\n%s", prettyJson);
                }
            } catch (JsonSyntaxException e) {
                Timber.w(e, "Failed to parse JSON, skipping pretty print");
            } catch (Exception e) {
                Timber.e(e, "Error while formatting JSON response");
            }
        }

        return response;
    }
}
```

## 如何使用

在你的 OkHttp 客户端构建时，将此拦截器添加到拦截器链中：

```java
OkHttpClient client = new OkHttpClient.Builder()
    // ... 其他配置
    .addInterceptor(new PrettyJsonResponseInterceptor()) 
    .build();
```
