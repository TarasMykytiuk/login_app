import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async register(data: any) {
        const isUserExist = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (isUserExist) throw new Error('Email already exists');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: { email: data.email, password: hashedPassword },
            select: { id: true, email: true },
        });
    }
}
