from micropython import const
from machine import Pin, ADC

MAX_ADC_VALUE = const(4095)


def set_led(pin, state):
    out = Pin(pin, Pin.OUT)
    if state == "on" or state == "1" or state == 1:
        out.on()
    else:
        out.off()


def toggle_led(pin):
    out = Pin(pin, Pin.OUT)
    out.value(not out.value())


def is_led_on(pin):
    out = Pin(pin)
    return out.value() == 1


def get_brightness(pin):
    adc = ADC(Pin(pin))
    adc.atten(ADC.ATTN_11DB)
    value = adc.read() * 1000 // MAX_ADC_VALUE
    return min(max(value, 0), 100)
