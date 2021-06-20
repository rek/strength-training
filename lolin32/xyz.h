#pragma once
#include <Adafruit_Sensor.h> // to get the sensors_event_t class

class XYZ
{
public:
  void setup();
  void printEvent(sensors_event_t *event);
  sensors_event_t *getOReading();

  int getZReading();
  float getHeightReading();
};
