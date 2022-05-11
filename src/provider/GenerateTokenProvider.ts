import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, '33779428-f03f-4f4f-929d-b1db7d8441d0', {
      subject: userId,
      expiresIn: '20s',
    });

    return token;
  }
}

export { GenerateTokenProvider };
