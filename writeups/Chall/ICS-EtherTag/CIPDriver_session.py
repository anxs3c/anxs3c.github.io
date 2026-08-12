from pycomm3 import CIPDriver

target = "154.57.164.71:31475"

with CIPDriver(target) as dev_conn:
    print(f">> session established successfully : {target}")
