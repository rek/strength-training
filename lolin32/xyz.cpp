#include "xyz.h"

#include <Wire.h>
#include <Adafruit_Sensor.h>  // to get the sensors_event_t class
#include <Adafruit_BNO055.h>  // main xyz sensor
#include <utility/imumaths.h> // ?

/* Set the delay between fresh samples */
uint16_t BNO055_SAMPLERATE_DELAY_MS = 100;

#define SDA_PIN 16
#define SCL_PIN 4

// Check I2C device address and correct line below (by default address is 0x29 or 0x28)
//                                   id, address
Adafruit_BNO055 bno = Adafruit_BNO055(55, 0x29);

void showCalibrationValues(){
    adafruit_bno055_offsets_t calibrationData;
    bno.getSensorOffsets(calibrationData);
//    Serial.println("//----Add this code to your setup funciton, after bno is initialized----");
    Serial.println("adafruit_bno055_offsets_t calibrationData;");
    Serial.print("calibrationData.accel_offset_x = "); Serial.print(calibrationData.accel_offset_x); Serial.println(";");
    Serial.print("calibrationData.accel_offset_y = "); Serial.print(calibrationData.accel_offset_y); Serial.println(";");
    Serial.print("calibrationData.accel_offset_z = "); Serial.print(calibrationData.accel_offset_z); Serial.println(";");
    Serial.print("calibrationData.accel_radius = "); Serial.print(calibrationData.accel_radius); Serial.println(";");
//    Serial.print("calibrationData.gyro_offset_x = "); Serial.print(calibrationData.gyro_offset_x); Serial.println(";");
//    Serial.print("calibrationData.gyro_offset_y = "); Serial.print(calibrationData.gyro_offset_y); Serial.println(";");
//    Serial.print("calibrationData.gyro_offset_z = "); Serial.print(calibrationData.gyro_offset_z); Serial.println(";");
//    Serial.print("calibrationData.mag_offset_z = "); Serial.print(calibrationData.accel_offset_z); Serial.println(";");
//    Serial.print("calibrationData.mag_offset_x = "); Serial.print(calibrationData.gyro_offset_x); Serial.println(";");
//    Serial.print("calibrationData.mag_offset_y = "); Serial.print(calibrationData.gyro_offset_y); Serial.println(";");
//    Serial.print("calibrationData.mag_radius = "); Serial.print(calibrationData.mag_radius); Serial.println(";");
    Serial.println("bno.setSensorOffsets(calibrationData);"); 
      // Stop here, let user copy and paste the code in peace. 
//    while(1){
    //calibrationData.accel_offset_x = 0;
    //calibrationData.accel_offset_y = -8988;
    //calibrationData.accel_offset_z = 16379;
    //calibrationData.gyro_offset_x = 16379;
    //calibrationData.gyro_offset_y = 6640;
    //calibrationData.gyro_offset_z = 16380;
    //calibrationData.mag_offset_z = 16379;
    //calibrationData.mag_offset_x = 16379;
    //calibrationData.mag_offset_y = 6640;
    //calibrationData.accel_radius = 2;
    //calibrationData.mag_radius = 0;
    //    }
}

void XYZ::setup()
{
  Serial.println("");
  Serial.println("Orientation Sensor Test");
  Serial.println("");

  Wire.begin(SDA_PIN, SCL_PIN);

  /* Initialise the sensor */
  if (!bno.begin())
  {
    /* There was a problem detecting the BNO055 ... check your connections */
    Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while (1)
      ;
  }
}

void XYZ::doCalibration() {
  uint8_t system = 0;
  uint8_t gyro = 0;
  uint8_t accel = 0;
  uint8_t mag = 0;

  bno.getCalibration(&system, &gyro, &accel, &mag);  

  while (accel != 3 && system != 3) {
//  while (mag != 3 && gyro != 3 && accel != 3 && system != 3) {
    bno.getCalibration(&system, &gyro, &accel, &mag);
    showCalibrationValues();
    Serial.println(""); 
  } 
  
  Serial.println("Calibration complete!"); 
  isCalibrated = true;
}

sensors_event_t *XYZ::getOReading()
{
  sensors_event_t orientationData;
  bno.getEvent(&orientationData, Adafruit_BNO055::VECTOR_EULER);
  return &orientationData;
}

float XYZ::getHeightReading()
{
  sensors_event_t linearAccelData;
  bno.getEvent(&linearAccelData, Adafruit_BNO055::VECTOR_LINEARACCEL);

  Serial.print(linearAccelData.acceleration.x);
  Serial.print(" ");
  Serial.print(linearAccelData.acceleration.y);
  Serial.print(" ");
  Serial.print(linearAccelData.acceleration.z);
  Serial.print(" ");
  return linearAccelData.acceleration.y;
}

int XYZ::getZReading()
{
  sensors_event_t orientationData;
  //  sensors_event_t angVelocityData;
  //  sensors_event_t linearAccelData;
  //  sensors_event_t magnetometerData;
  //  sensors_event_t accelerometerData;
  //  sensors_event_t gravityData;

  bno.getEvent(&orientationData, Adafruit_BNO055::VECTOR_EULER);
  // printEvent(&orientationData);



  delay(BNO055_SAMPLERATE_DELAY_MS);

  return orientationData.orientation.z;
}

void XYZ::printEvent(sensors_event_t *event)
{
  double x = -1000000, y = -1000000, z = -1000000; //dumb values, easy to spot problem
  if (event->type == SENSOR_TYPE_ORIENTATION)
  {
    Serial.print("Orient:");
    x = event->orientation.x;
    y = event->orientation.y;
    z = event->orientation.z;
  }
  Serial.print("\tx= ");
  Serial.print(x);
  Serial.print(" |\ty= ");
  Serial.print(y);
  Serial.print(" |\tz= ");
  Serial.println(z);
}
