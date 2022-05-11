import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verificar se user existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    // Se já existir, lança um erro;
    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    // Se não existir, cadastra o novo user;
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
