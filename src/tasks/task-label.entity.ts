import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
@Unique(['name','taskId'])
export class TaskLabel{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    name: string; 

    @ManyToOne  (() => Task, (task) => task.taskLabels,{
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    task: Task[];

    @Column()
    @Index()
    taskId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}