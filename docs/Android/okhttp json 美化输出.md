# okhttp json 美化输出

```java
/**
 * @ref {@link okhttp3.logging.HttpLoggingInterceptor}
 */
public class PrettyJsonResponseInterceptor implements Interceptor {
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @NonNull
    @Override
    public Response intercept(@NonNull Chain chain) throws IOException {
        Response response = chain.proceed(chain.request());
        ResponseBody responseBody = response.body();
        if (responseBody != null) {
            MediaType contentType = responseBody.contentType();
            if (contentType != null && "application/json".equals(contentType.toString())) {
                Buffer buffer = responseBody.source().getBuffer();
                String bodyString = buffer.clone().readString(StandardCharsets.UTF_8);
                JsonElement jsonElement = JsonParser.parseString(bodyString);
                String prettyJsonString = gson.toJson(jsonElement);
                Timber.d("<-- Pretty print json body: \n%s", prettyJsonString);
            }
        }
        return response;
    }
}

```