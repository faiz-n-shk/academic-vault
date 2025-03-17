Q-1
a) Define Belady’s Anomaly.
Belady’s Anomaly refers to the counterintuitive situation where increasing the number of page frames results in an increase in the number of page faults in certain page replacement algorithms, such as FIFO (First-In-First-Out).

b) Define Burst Time.
Burst Time is the time required by a process for its execution on the CPU. It can be divided into CPU burst time and I/O burst time.

c) Define Rollback.
Rollback is a recovery mechanism in database systems and transaction processing where the system reverts to a previous stable state in case of a failure or error. This ensures data integrity and consistency by undoing any partial or incomplete transactions.

d) Define system program.
System programs provide an environment for the development, execution, and management of application programs. They include operating systems, compilers, assemblers, and utility programs.

e) Define Turnaround time and Waiting time of a process.

- Turnaround Time: The total time taken from the submission of a process to its completion.
- Waiting Time: The total time a process spends in the ready queue waiting for CPU time.

f) Define Throughput and Response time.

- Throughput: The number of processes that complete their execution per time unit.
- Response Time: The time from the submission of a request until the first response is produced.

g) Explain different types of scheduling queues.
Scheduling queues are used to manage processes in an operating system. The main types are:

- Job Queue: Holds all the processes in the system.
- Ready Queue: Contains processes that are ready to execute.
- Device Queue: Contains processes waiting for an I/O device.

h) Explain medium term scheduler.
The medium-term scheduler is responsible for swapping processes in and out of the memory. It temporarily removes processes from main memory and places them in secondary storage (or vice versa) to improve the process mix.

i) List any four attributes of files.

1. Name: The human-readable identifier of the file.
2. Type: The kind of file, such as a text file, binary file, or executable file.
3. Size: The amount of data contained in the file, usually measured in bytes.
4. Permissions: The access rights granted to users and groups for reading, writing, and executing the file.

j) What do you mean by seek Time in Disk Scheduling.
Seek Time is the time taken by the read/write head of a disk drive to move to the track where the data to be read or written is located. It is a crucial factor in the overall performance of disk operations.

k) What does FIFO and MFU stand for?
FIFO stands for First-In, First-Out, a scheduling algorithm where the first process to arrive is the first to be executed.
MFU stands for Most Frequently Used, a page replacement algorithm that replaces the page that has been used most frequently.

l) What is a process?
A process is a program in execution. It is an active entity with a program counter, registers, and variables. A process goes through different states such as new, ready, running, waiting, and terminated.

m) What is demand paging?
Demand paging is a memory management scheme that loads pages into memory only when they are needed, rather than loading the entire program into memory at once. This helps in reducing the amount of memory used and allows for more efficient use of resources.

n) What is dispatcher?
A dispatcher is a component of the operating system that gives control of the CPU to the process selected by the short-term scheduler. It involves context switching, switching to user mode, and jumping to the proper location in the user program to restart that program.

o) What is meant by Deadlock?
Deadlock is a situation in a multiprogramming environment where two or more processes are unable to proceed because each is waiting for the other to release a resource. This results in a standstill where no process can continue.

p) What is starvation?
Starvation is a condition where a process is perpetually denied necessary resources to proceed with its execution, usually because of the continuous allocation of resources to other processes.

q) What is system call? Explain with example.
A system call is a way for programs to interact with the operating system. It provides an interface between a process and the operating system. For example, the `open()` system call in Unix-based systems is used to open a file.

r) Which scheduler controls the degree of multiprogramming?
The long-term scheduler, also known as the job scheduler, controls the degree of multiprogramming by determining which jobs or processes are admitted to the system for processing.

s) Define Context Switch.
A context switch is the process of storing the state of a process or thread, so that it can be restored and execution resumed from the same point later. This allows multiple processes to share a single CPU.

t) What is an operating system? List different types of operating systems.
An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs. The OS acts as an intermediary between users and the computer hardware. Different types of operating systems include:

- Batch Operating System
- Time-Sharing Operating System
- Distributed Operating System
- Network Operating System
- Real-Time Operating System

Q-2
a) Services provided by the Operating System (10 Marks): An operating system (OS) acts as an intermediary between users and computer hardware. It provides various essential services:

1. Process Management - The OS handles process creation, scheduling, execution, and termination. It ensures fair CPU time allocation and avoids process starvation.
2. Memory Management - It manages RAM allocation and deallocation, ensuring optimal use of memory resources through paging, segmentation, and virtual memory techniques.
3. File System Management - The OS organizes and manages files and directories. It supports file operations like reading, writing, creating, deleting, and access control.
4. I/O Device Management - It controls communication between hardware devices (printers, keyboards, etc.) and software, using device drivers.
5. Security & Protection - The OS enforces authentication, authorization, and encryption to protect data from unauthorized access and cyber threats.
6. Error Detection & Handling - It detects system failures, software bugs, and hardware malfunctions, providing necessary recovery mechanisms.
7. Networking & Communication - The OS enables data exchange over networks, providing protocols like TCP/IP and managing network connections.

b) Process Control Block (PCB) with Diagram (8 Marks):

A Process Control Block (PCB) is a data structure maintained by the OS for every process. It contains crucial process-related information, including:
i) Process ID (PID): Unique identifier for the process.
ii) Process State: Indicates whether the process is new, ready, running, waiting, or terminated.
iii) Program Counter: Stores the address of the next instruction to be executed.
iv) CPU Registers: Includes accumulators, stack pointers, index registers, etc.
v) Memory Management Information: Contains base and limit registers for memory allocation.
vi) I/O Status Information: Tracks assigned I/O devices and pending I/O requests.
vii) Accounting Information: Stores execution time, process priority, and resource usage details.

---

| Process ID |
| Process State |
| Program Counter |
| CPU Registers |
| Memory Management Info |
| I/O Status Info |
| Accounting Info |

---

c) Difference between Long-Term and Short-Term Scheduler (6 Marks):
Feature Long-Term Scheduler Short-Term Scheduler
Frequency Runs infrequently Runs very frequently
Function Selects processes for execution from job queue Selects process from ready queue to execute
Execution Speed Slow Fast
Controls Degree of Multiprogramming CPU Scheduling
Process Type Selects I/O-bound and CPU-bound processes Selects the most suitable process for execution

d) Necessary Conditions for Deadlock (8 Marks): A deadlock occurs when a set of processes are indefinitely blocked, waiting for resources held by each other. It happens if the following four conditions hold simultaneously:

1. Mutual Exclusion: At least one resource must be held by a process in a non-shareable mode.
2. Hold and Wait: A process holding at least one resource is waiting to acquire additional resources held by other processes.
3. No Preemption: A resource cannot be forcibly taken from a process; it must be released voluntarily.
4. Circular Wait: A circular chain of two or more processes exists, where each process holds a resource required by the next process in the chain.
   To prevent deadlocks, these conditions must be negated using techniques like resource allocation graphs, banker’s algorithm, or preemption strategies.

e) Process and Process States (8 Marks): A process is a program in execution. It consists of the program code, its execution state, and associated resources.
Process States:

1. New: The process is being created but has not started execution.
2. Ready: The process is waiting in the ready queue to be assigned to the CPU.
3. Running: The process is currently executing on the CPU.
4. Waiting (Blocked): The process is waiting for an I/O operation or another resource to become available.
5. Terminated: The process has completed execution and is removed from the system.
   A process transitions between these states as it progresses through execution, controlled by the CPU scheduler.

f) Scheduling & Comparison of Short-Term and Long-Term Scheduler (6 Marks): Scheduling is the process of selecting processes for execution on the CPU. The OS uses various scheduling algorithms like FCFS, SJF, Round Robin, and Priority Scheduling to manage processes efficiently.
Feature Short-Term Scheduler Long-Term Scheduler
Speed Fast Slow
Function Allocates CPU Manages multiprogramming
Execution Runs frequently Runs infrequently

g) FCFS and Pre-emptive SJF Scheduling (10 Marks): Processes:
Process Burst Time Arrival Time
P1 5 1
P2 3 0
P3 2 2
P4 4 3
P5 8 2
FCFS Execution Order:
P2 → P1 → P3 → P4 → P5
Pre-emptive SJF Execution Order:
P2 → P3 → P1 → P4 → P5
Calculation of Average Turnaround Time & Average Waiting Time:

- FCFS:
  - Turnaround Time: P2=3, P1=7, P3=9, P4=13, P5=21
  - Waiting Time: P2=0, P1=2, P3=7, P4=9, P5=13
  - Average Turnaround Time: (3+7+9+13+21)/5 = 10.6
  - Average Waiting Time: (0+2+7+9+13)/5 = 6.2
- Pre-emptive SJF:
  - Turnaround Time: P2=3, P3=5, P1=10, P4=14, P5=22
  - Waiting Time: P2=0, P3=3, P1=5, P4=10, P5=14
  - Average Turnaround Time: (3+5+10+14+22)/5 = 10.8
  - Average Waiting Time: (0+3+5+10+14)/5 = 6.4

h) Round Robin Scheduling (Time Quantum = 3ms) (10 Marks): Processes:
Process Burst Time Arrival Time
P1 5 1
P2 7 0
P3 3 3
P4 10 2
Execution Order:
P2 → P1 → P4 → P3 → P2 → P1 → P4 → P2 → P4
Calculation of Average Turnaround Time & Average Waiting Time:

- Turnaround Time: P1=10, P2=16, P3=6, P4=25
- Waiting Time: P1=5, P2=9, P3=3, P4=15
- Average Turnaround Time: (10+16+6+25)/4 = 14.25
- Average Waiting Time: (5+9+3+15)/4 = 8

i) Deadlock Detection & Need Matrix Calculation (10 Marks): Allocation Table:
Process A B C
P0 0 1 0
P1 2 0 0
P2 3 0 3
P3 2 1 1
P4 0 0 2
Max Table:
Process A B C
P0 0 1 0
P1 4 0 2
P2 3 0 4
P3 3 1 1
P4 0 0 4
Available Resources: A=7, B=2, C=6
Need Matrix Calculation (Max - Allocation):
Process A B C
P0 0 0 0
P1 2 0 2
P2 0 0 1
P3 1 0 0
P4 0 0 2
Deadlock Detection:
Safe sequence check: (P0, P2, P3, P1, P4)
