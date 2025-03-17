1. **‘Operating system is like a manager of the computer system’. Explain.**

   An operating system (OS) acts as a manager of the computer system by managing hardware resources, providing a user interface, and executing and providing services for applications software. It handles tasks such as memory management, process scheduling, input/output operations, and file management.

2. **What is scheduling? Compare short term scheduler with medium term scheduler.**

   Scheduling is the process of deciding which processes in the system should be executed by the processor at any given time.

   - **Short Term Scheduler**: Also known as the CPU scheduler, it selects which process should be executed next and allocates CPU. It makes decisions frequently (milliseconds).
   - **Medium Term Scheduler**: It is responsible for swapping processes in and out of the memory to manage the degree of multiprogramming. It makes decisions less frequently (seconds or minutes).

3. **Compare multiprogramming with a multiprocessing system.**

   - **Multiprogramming**: It is a method where multiple programs are loaded into memory and the CPU switches between them to provide the illusion of concurrent execution.
   - **Multiprocessing**: It involves multiple CPUs within a single computer system, allowing multiple processes to be executed simultaneously.

4. **Explain Operating System Structure.**

   Operating systems can have different structures such as monolithic, layered, microkernel, and modular. Each structure has its own way of managing system resources and providing services to applications.

   - **Monolithic Structure**: The entire OS runs as a single program in kernel mode, including services like file management and device drivers.
   - **Layered Structure**: The OS is divided into layers, each built on top of lower layers, with the lowest interacting with hardware and the highest providing services to applications.
   - **Microkernel Structure**: Minimizes the kernel by running most services in user space, handling only essential functions like inter-process communication.
   - **Modular Structure**: Similar to monolithic but allows dynamic loading/unloading of modules, providing flexibility and ease of maintenance.

5. **Calculate average turn around time and average waiting time for all set of processes using FCFS algorithm.**

   | Process | Burst Time | Arrival Time |
   | ------- | ---------- | ------------ |
   | P1      | 5          | 1            |
   | P2      | 6          | 0            |
   | P3      | 2          | 2            |
   | P4      | 4          | 0            |

   **Answer:**

   | Process | Completion Time | Turn Around Time | Waiting Time |
   | ------- | --------------- | ---------------- | ------------ |
   | P1      | 11              | 10               | 5            |
   | P2      | 6               | 6                | 0            |
   | P3      | 13              | 11               | 9            |
   | P4      | 10              | 10               | 6            |

   - **Average Turn Around Time**: (10 + 6 + 11 + 10) / 4 = 9.25
   - **Average Waiting Time**: (5 + 0 + 9 + 6) / 4 = 5

6. **What are the differences between Preemptive and Non-Preemptive Scheduling?**

   | Feature              | Preemptive Scheduling            | Non-Preemptive Scheduling      |
   | -------------------- | -------------------------------- | ------------------------------ |
   | Process Interruption | Can interrupt a process          | Cannot interrupt a process     |
   | Response Time        | Better response time             | Higher response time           |
   | Complexity           | More complex to implement        | Simpler to implement           |
   | Example Algorithms   | Round Robin, Priority Scheduling | FCFS, Shortest Job First (SJF) |

7. **Difference between batch operating system and real time operating system.**

   - **Batch Operating System**: Executes batches of jobs without user interaction. Jobs are processed in the order they are submitted. It is suitable for tasks that do not require immediate response, such as payroll processing and end-of-day reports.
   - **Real Time Operating System**: Provides immediate processing and response to input. It is used in syst
   - **Process Management**: Handles the creation, scheduling, and termination of processes, managing synchronization and communication.
   - **Memory Management**: Manages allocation and deallocation of memory, ensuring efficient utilization.
   - **File System Management**: Manages files on storage devices, providing services like creation, deletion, reading, writing, and access control.
   - **Device Management**: Manages device communication via drivers, handling input/output operations.
   - **Security**: Protects data and resources from unauthorized access, enforcing access control policies.
   - **User Interface**: Provides interfaces like CLI or GUI for user interaction.
   - **Networking**: Enables communication and resource sharing over a network.
   - **Error Detection and Handling**: Detects and handles hardware and software errors, ensuring system stability.
