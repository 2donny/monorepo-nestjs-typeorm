import { UserModule } from './../../../src/user/User.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from './../../../src/user/UserQueryRepository';
import { User } from './../../../src/user/User.entity';
import { getConnection, Repository } from 'typeorm';
import { getPgTestTypeOrmModule } from '../../../getPgTestTypeOrmModule';

describe('UserQueryRepository', () => {
  let userRepository: Repository<User>;
  let userQueryRepository: UserQueryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  afterEach(async () => {
    await userRepository.clear();
    await getConnection().close();
  });

  it('save', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;

    // when
    const savedUser = await userRepository.save(user);

    // then
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });

  it('findUserName', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    await userRepository.save(user);

    // when
    const result = await userQueryRepository.findUserName(user.id);

    // then
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
