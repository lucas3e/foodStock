import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await compare(password, user.senha_hash)) {
      const { senha_hash, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: Partial<User>) {
    const payload = { 
      sub: user.id, 
      email: user.email,
      nome: user.nome,
      tipo: user.tipo
    };
    
    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
      token: this.jwtService.sign(payload),
    };
  }
}
