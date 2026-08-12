from pycomm3 import LogixDriver

target = "154.57.164.71:31475"

with LogixDriver(target, init_tags=False) as plc:
    print("Controller Information: ")
    for key, value in plc.info.items():
        print(f" > {key}: {value}")
