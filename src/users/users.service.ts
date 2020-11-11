import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginRsp, SignupRsp, CreateUser, User } from './interfaces/user';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { LogUserDTO } from './dto/log-user.dto';

@Injectable()
export class UsersService {
  // tslint:disable-next-line:no-empty
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<CreateUser>,
    private hasherService: PasswordHasherService,
    private jwtService: JwtService,
  ) {}
  async signUp(doc: CreateUserDTO): Promise<SignupRsp> {
    // if user has already creted with this email
    // send the error
    const user = await this.userModel.findOne({ email: doc.email })
    if (user) {
      throw new UnauthorizedException(`User already created with this email: ${doc.email}`)
    }

    // encrypt the user password before saving to database
    const encryptedPassword = await this.hasherService.hashPassword(doc.password)
    const newUser = new this.userModel({ email: doc.email, name: doc.name, age: doc.age, password: encryptedPassword });
    await newUser.save()
    return { email: newUser.email, name: newUser.name, age: newUser.age }
  }

  async logIn(doc: LogUserDTO): Promise<LoginRsp> {

    // verify user email
    const user = await this.userModel.findOne({ email: doc.email })
    if (!user) {
      throw new UnauthorizedException('Unable to log in')
    }

    const matchedPassword = await this.hasherService.comparePassword(doc.password, user.password)
    // verify user password
    if (matchedPassword) {
      // generate JSON web token
      const token = await this.jwtService.signAsync(
        { email: user.email, id: user._id, name: user.name, age: user.age }, 
        { expiresIn: '1d' }
      )
      return { token }
    } else {
      throw new UnauthorizedException('Unable to log in')
    }
  }
  async validateUserById(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId)
    if (user) {
      return true
    } else {
      return false
    }
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId)

    if (!user) {
      throw new UnauthorizedException('bad id')
    }

    return user
  }
  
}
