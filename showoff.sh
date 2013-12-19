#/bin/sh

i2cset -y 1 32 0x09 0
i2cset -y 1 33 0x09 0
sleep 0.5
i2cset -y 1 32 0x09 1
sleep 0.5
i2cset -y 1 32 0x09 2
sleep 0.5
i2cset -y 1 32 0x09 4
sleep 0.5
i2cset -y 1 32 0x09 0

i2cset -y 1 33 0x09 0
sleep 0.5
i2cset -y 1 33 0x09 1
sleep 0.5
i2cset -y 1 33 0x09 2
sleep 0.5
i2cset -y 1 33 0x09 4
sleep 0.5
i2cset -y 1 33 0x09 0

i2cset -y 1 32 0x09 1
i2cset -y 1 33 0x09 1
sleep 0.5
i2cset -y 1 32 0x09 3
i2cset -y 1 33 0x09 3
sleep 0.5
i2cset -y 1 32 0x09 7
i2cset -y 1 33 0x09 7
sleep 0.5
i2cset -y 1 32 0x09 0
i2cset -y 1 33 0x09 0
