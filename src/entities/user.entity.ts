import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Exclude } from "class-transformer"
import { Profile } from "./profile.entity"
import { Task } from "./task.entity"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToOne(
    () => Profile,
    (profile) => profile.user,
    { cascade: true },
  )
  @JoinColumn()
  profile: Profile

  @OneToMany(
    () => Task,
    (task) => task.user,
  )
  tasks: Task[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}