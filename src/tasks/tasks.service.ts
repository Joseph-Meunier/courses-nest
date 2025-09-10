import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task> 
    ){

    }

    public async findAllTasks(): Promise<Task[]>{
        return await this.tasksRepository.find();
    }

    public async findOneTaskById(id: string): Promise< Task | null>{
        return await this.tasksRepository.findOne({
            where: {id},
            relations: ['taskLabels'],
         });
    }
     
    public async createTask(CreateTaskDto: CreateTaskDto): Promise<Task>{
        return await  this.tasksRepository.save(CreateTaskDto);
    }

    public async updateTask(task: Task, updateTaskDto: UpdateTaskDto): Promise<Task>{
        if(updateTaskDto.status && !this.isValidStatusTransition(updateTaskDto.status, updateTaskDto.status)){
            throw new WrongTaskStatusException();
        }

        Object.assign(task, updateTaskDto);
        return await this.tasksRepository.save(task);
    }

    public async deleteTask(task: Task) : Promise<void> {
        await this.tasksRepository.delete(task);
    }

    private isValidStatusTransition(
        CurrentStatus: TaskStatus, 
        NewStatus: TaskStatus
    ): boolean{
        const statusOrder = [
            TaskStatus.OPEN,
            TaskStatus.IN_PROGRESS,
            TaskStatus.DONE
        ];
        return statusOrder.indexOf(CurrentStatus) <= statusOrder.indexOf(NewStatus);
    } 
} 
