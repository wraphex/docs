# mosquitto

```bash
sudo apt install mosquitto mosquitto-client
```

mosquitto.conf

```bash
listener 1883
protocol mqtt
listener 9001
protocol websockets
allow_anonymous true
```