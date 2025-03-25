import { User } from "../entities/user.entity"
import AppDataSource from "../data-source"

export class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["profile"],
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    })
  }
}

