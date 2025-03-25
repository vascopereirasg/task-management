import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { User } from "./user.entity"
import { Project } from "./project.entity"
import { Tag } from "./tag.entity"

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus

  @ManyToOne(
    () => User,
    (user) => user.tasks,
  )
  user: User

  @ManyToOne(
    () => Project,
    (project) => project.tasks,
  )
  project: Project

  @ManyToMany(
    () => Tag,
    (tag) => tag.tasks,
  )
  @JoinTable()
  tags: Tag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

