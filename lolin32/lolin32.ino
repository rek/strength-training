#include <WebServer.h>
#include <iostream> // std::cout, std::ios
#include <sstream>  // std::ostringstream

#include "wifiBroadcast.h"
#include "xyz.h"

/*
 * flash frequency: 80hz
 * Board: wemos lolin32 lite
 * upload speed: 460800
 */

#define BUFFER_MAX 2000
#define READING_DELAY 10
XYZ xyz;
int counter = 0;
WebServer server(80);
boolean recording = false;
// std::ostringstream sensorReadings;
std::ostringstream sensorReadings(std::ostringstream::ate);

void serverStartRecording()
{
  Serial.println("Start recording");

  // delete last recording
  counter = 0;

  // we put this all into one stream, because i coulndn't figure out how to join the data otherwise
  sensorReadings << "{\"status\": 200, \"data\": [";

  // set mode back to record
  recording = true;

  server.send(200, "text/plain", "{\"status\": 200}");
}

void serverStopRecording()
{
  Serial.println("Stop recording");

  if (recording)
  {
    // finish off data structure in the stream
    sensorReadings << "]}";
  }

  // stop recording
  recording = false;

  serverLastRecording();
}
void serverIsCalibrated()
{
  server.send(200, "text/plain", xyz.isCalibrated ? "true" : "false");
}
void serverGetStatus()
{
  server.send(200, "text/plain", "true");
}
void serverLastRecording()
{
  Serial.println("Generate output");

  // convet the stream into a string
  char output[sensorReadings.str().length() + 2] = {};
  strcpy(output, sensorReadings.str().c_str());

  Serial.println(output);
  server.send(200, "text/plain", output);

  sensorReadings.clear();
  sensorReadings.str("");
}

void setup(void)
{
  Serial.begin(115200);

  WifiBroadcast wifiBroadcast;

  wifiBroadcast.setup();

  delay(500); // needs time to startup

  xyz.setup();
  server.on("/_status", serverGetStatus);
  server.on("/start", serverStartRecording);
  server.on("/stop", serverStopRecording);
  server.on("/get", serverLastRecording);
  server.on("/isCalibrated", serverIsCalibrated);
  server.begin();
  server.enableCORS(true);

  Serial.println("");
  Serial.println("Setup complete");
  Serial.println("");
}

uint8_t system_ = 0;
uint8_t gyro = 0;
uint8_t accel = 0;
uint8_t mag = 0;

void loop(void)
{
  server.handleClient();

  if (!xyz.isCalibrated)
  {
    xyz.doCalibration(system_, gyro, accel, mag);
    delay(100);
    return;
  }

  if (recording)
  {
    if (counter < BUFFER_MAX)
    {
      float dataItem = xyz.getHeightReading();
      sensorReadings << dataItem;
      sensorReadings << ",";
      Serial.println(dataItem);
      counter++;
    }
    else
    {
      Serial.println("Buffer full");
    }
  }

  // xyz.printEvent(xyz.getOReading());

  delay(READING_DELAY);
}
