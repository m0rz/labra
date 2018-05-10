import time
import sys
import os

# Buzzer lengths
BUZZER_SHORT = .1
BUZZER_MEDIUM = .5
BUZZER_LONG = 1

# Frequency of buzzer
SOUND_FREQ = 880  # Hz

class AlertSystem(object):
  def __init__(self, distances):
    self.short_distance = distances["short"]
    self.medium_distance = distances["medium"]
    self.long_distance = distances["long"]
  
  def watch(self, data):
    print("Looking over data")
    self.should_play(i)    
  
  def play_sound(self, length):
    os.system('play --no-show-progress --null --channels 1 synth %s sine %f' % (length, SOUND_FREQ))
    time.sleep(length)

  def should_play(self, distance):
    if(distance < self.short_distance):
      print("It's near")
      return self.play_sound(BUZZER_LONG)
    if(distance < self.medium_distance):
      print("It's mid")
      return self.play_sound(BUZZER_MEDIUM)
    if(distance < self.long_distance):
      print("It's far")
      return self.play_sound(BUZZER_SHORT)

if __name__ == "__main__":
  # Initializing rear-radar with values
  alert_system = AlertSystem({
    "short": 5,
    "medium": 10,
    "long": 15
  })

  for i in reversed(range(0, 15)):
    alert_system.watch(i)
