import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    public async findAll(): Promise<Task[]> {
        return await this.tasksService.findAllTasks();
    } 

    @Get('/:id')
    public async findOne(@Param() params: FindOneParams ): Promise<Task | null> {
        return await this.FindOneOrFail(params.id);
    }

    @Post()
    public async create(@Body() CreateTaskDto: CreateTaskDto): Promise<Task>{
        return await this.tasksService.createTask(CreateTaskDto); 
    }

    @Patch('/:id')
    public async updateTaskStatus(
        @Param() params: FindOneParams,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task>{
        const task = await this.FindOneOrFail(params.id);
        try{
            return await this.tasksService.updateTask(task, updateTaskDto);
        }catch(error){
            if(error instanceof WrongTaskStatusException){
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteTask(@Param() params: FindOneParams): Promise<void>{
        const task = await this.FindOneOrFail(params.id);
        await this.tasksService.deleteTask(task);
    }

    private async FindOneOrFail(id: string): Promise<Task>{
        const task = await this.tasksService.findOneTaskById(id);
        if(!task){
            throw new NotFoundException();
        }
         
        return task;
    }
}
