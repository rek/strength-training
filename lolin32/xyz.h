#pragma once
#include <Adafruit_Sensor.h> // to get the sensors_event_t class

class XYZ
{
public:
  void setup();
  void printEvent(sensors_event_t *event);
  sensors_event_t *getOReading();

  bool isCalibrated;
  int getZReading();
  float getHeightReading();
  void doCalibration(uint8_t system, uint8_t gyro, uint8_t accel, uint8_t mag);
};
