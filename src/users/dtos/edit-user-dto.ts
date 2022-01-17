import { IsNotEmpty, IsString, Validate } from "class-validator";
import { Role } from "src/auth/role/role.enum";


export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  @Validate((o) => o.firstName)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Validate((o) => o.email)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate((o) => o.password)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate((o) => o.roles)
  roles: Role;
}