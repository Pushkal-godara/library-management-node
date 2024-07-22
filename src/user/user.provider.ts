import { User } from './entities/user.entity';
import { USER_REPO } from 'src/common/constant';

export const UserProviders = [
    {
        provide: USER_REPO,
        useValue: User,
    },
]