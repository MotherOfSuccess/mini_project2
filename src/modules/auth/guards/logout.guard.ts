import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LogoutGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
      }
    
    handleRequest(err, user) {
        return user;
    }
}