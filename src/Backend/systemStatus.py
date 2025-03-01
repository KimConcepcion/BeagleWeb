import os
import datetime
import json
import psutil

class SystemMonitor:
    def __init__(self) -> None:
        pass
    
    def getKernelData(self):
        return {
            'kernel_version' : os.uname().release,
            'system_name'    : os.uname().sysname,
            'node_name'      : os.uname().nodename,
            'machine_name'   : os.uname().machine
        }
        
    def getCpuData(self):
        return {
            'physical_cores'    : psutil.cpu_count(logical=False),
            'total_cores'       : psutil.cpu_count(logical=True),
            'processor_speed'   : psutil.cpu_freq().current,
            'cpu_usage_per_core': dict(enumerate(psutil.cpu_percent(percpu=True, interval=1))),
            'total_cpu_usage'   : psutil.cpu_percent(interval=1)
        }
    
    def getMemoryData(self):
        return {
            'total_memory'      : psutil.virtual_memory().total     / (1024.0 ** 3),
            'available_memory'  : psutil.virtual_memory().available / (1024.0 ** 3),
            'used_memory'       : psutil.virtual_memory().used      / (1024.0 ** 3),
            'used_memory'       : psutil.virtual_memory().percent
        }
    
    def getDiskData(self):
        partitions = psutil.disk_partitions()
        disk_info  = {}
        
        for partition in partitions:
            partition_usage = psutil.disk_usage(partition.mountpoint)
            disk_info[partition.mountpoint] = {
                'total_space'       : partition_usage.total / (1024.0 ** 3),
                'used_space'        : partition_usage.used  / (1024.0 ** 3),
                'free_space'        : partition_usage.free  / (1024.0 ** 3),
                'usage_percentage'  : partition_usage.percent,
            }
        return disk_info
    
    def getIoDiskData(self):
        return {
            'read_count'    : psutil.disk_io_counters().read_count,
            'write_count'   : psutil.disk_io_counters().write_count,
            'read_bytes'    : psutil.disk_io_counters().read_bytes,
            'write_bytes'   : psutil.disk_io_counters().write_bytes,
            'read_time'     : psutil.disk_io_counters().read_time,
            'write_time'    : psutil.disk_io_counters().write_time
        }
        
    def getIoNetworkData(self):
        return {
            'bytes_sent'    : psutil.net_io_counters().bytes_sent,
            'bytes_recv'    : psutil.net_io_counters().bytes_recv,
            'packets_sent'  : psutil.net_io_counters().packets_sent,
            'packets_recv'  : psutil.net_io_counters().packets_recv,
            'errin'         : psutil.net_io_counters().errin,
            'errout'        : psutil.net_io_counters().errout,
            'dropin'        : psutil.net_io_counters().dropin,
            'dropout'       : psutil.net_io_counters().dropout
        }
    
    def getUptimeData(self):
        boot_timestamp    = psutil.boot_time()
        current_timestamp = datetime.datetime.now().timestamp()
        uptime            = datetime.datetime.fromtimestamp( current_timestamp - boot_timestamp )
        
        return {
            'days'    : uptime.day,
            'hours'   : uptime.hour,
            'minutes' : uptime.minute,
            'seconds' : uptime.second,
        }
    
    # def getStaticSystemData(self):
    #     staticData = {
    #         'kernel_data'   : self.getKernelData()
    #     }
    
    def getSystemData(self):
        systemData = {
            'kernel_data'   : self.getKernelData(),
            'cpu_data'      : self.getCpuData(),
            'memory_data'   : self.getMemoryData(),
            'disk_data'     : self.getDiskData(),
            'disk_io_data'  : self.getIoDiskData(),
            'net_io_data'   : self.getIoNetworkData(),
            'uptime_data'   : self.getUptimeData(),
        }
        
        return json.dumps(systemData, indent=4)
        