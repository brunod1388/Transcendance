# Details

Date : 2023-03-13 05:34:52

Directory /Users/bruno1388/Desktop/trans/server/src

Total : 74 files,  2037 codes, 257 comments, 403 blanks, all 2697 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [server/src/app.module.ts](/server/src/app.module.ts) | TypeScript | 24 | 0 | 2 | 26 |
| [server/src/auth/auth.controller.ts](/server/src/auth/auth.controller.ts) | TypeScript | 184 | 6 | 18 | 208 |
| [server/src/auth/auth.module.ts](/server/src/auth/auth.module.ts) | TypeScript | 15 | 2 | 2 | 19 |
| [server/src/auth/auth.service.ts](/server/src/auth/auth.service.ts) | TypeScript | 189 | 17 | 27 | 233 |
| [server/src/auth/decorator/get-user.decorator.ts](/server/src/auth/decorator/get-user.decorator.ts) | TypeScript | 10 | 3 | 2 | 15 |
| [server/src/auth/decorator/index.ts](/server/src/auth/decorator/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [server/src/auth/dto/auth.dto.ts](/server/src/auth/dto/auth.dto.ts) | TypeScript | 14 | 10 | 7 | 31 |
| [server/src/auth/dto/index.ts](/server/src/auth/dto/index.ts) | TypeScript | 1 | 3 | 1 | 5 |
| [server/src/auth/guard/FortyTwo.guard.ts](/server/src/auth/guard/FortyTwo.guard.ts) | TypeScript | 2 | 0 | 2 | 4 |
| [server/src/auth/guard/index.ts](/server/src/auth/guard/index.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [server/src/auth/guard/jwt.guard.ts](/server/src/auth/guard/jwt.guard.ts) | TypeScript | 6 | 4 | 2 | 12 |
| [server/src/auth/guard/tfa.guard.ts](/server/src/auth/guard/tfa.guard.ts) | TypeScript | 6 | 4 | 2 | 12 |
| [server/src/auth/strategy/42strategy/ft.strategy.ts](/server/src/auth/strategy/42strategy/ft.strategy.ts) | TypeScript | 51 | 23 | 4 | 78 |
| [server/src/auth/strategy/42strategy/index.ts](/server/src/auth/strategy/42strategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [server/src/auth/strategy/JWTstrategy/index.ts](/server/src/auth/strategy/JWTstrategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [server/src/auth/strategy/JWTstrategy/jwt.strategy.ts](/server/src/auth/strategy/JWTstrategy/jwt.strategy.ts) | TypeScript | 37 | 17 | 5 | 59 |
| [server/src/auth/strategy/TFAstrategy/index.ts](/server/src/auth/strategy/TFAstrategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [server/src/auth/strategy/TFAstrategy/tfa.strategy.ts](/server/src/auth/strategy/TFAstrategy/tfa.strategy.ts) | TypeScript | 30 | 9 | 4 | 43 |
| [server/src/chat/blocked/blocked.module.ts](/server/src/chat/blocked/blocked.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [server/src/chat/blocked/blocked.service.ts](/server/src/chat/blocked/blocked.service.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [server/src/chat/channel/channel.module.ts](/server/src/chat/channel/channel.module.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [server/src/chat/channel/channel.service.ts](/server/src/chat/channel/channel.service.ts) | TypeScript | 66 | 0 | 6 | 72 |
| [server/src/chat/channelUser/channelUsers.module.ts](/server/src/chat/channelUser/channelUsers.module.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [server/src/chat/channelUser/channelUsers.service.ts](/server/src/chat/channelUser/channelUsers.service.ts) | TypeScript | 75 | 0 | 5 | 80 |
| [server/src/chat/chat.gateway.ts](/server/src/chat/chat.gateway.ts) | TypeScript | 144 | 16 | 24 | 184 |
| [server/src/chat/chat.module.ts](/server/src/chat/chat.module.ts) | TypeScript | 43 | 1 | 2 | 46 |
| [server/src/chat/chat.service.ts](/server/src/chat/chat.service.ts) | TypeScript | 20 | 11 | 5 | 36 |
| [server/src/chat/dtos/Channel.dto.ts](/server/src/chat/dtos/Channel.dto.ts) | TypeScript | 45 | 0 | 11 | 56 |
| [server/src/chat/dtos/ChannelUsers.dto.ts](/server/src/chat/dtos/ChannelUsers.dto.ts) | TypeScript | 35 | 0 | 9 | 44 |
| [server/src/chat/dtos/MessageValidation.dto.ts](/server/src/chat/dtos/MessageValidation.dto.ts) | TypeScript | 21 | 0 | 7 | 28 |
| [server/src/chat/entities/BlockedUser.entity.ts](/server/src/chat/entities/BlockedUser.entity.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [server/src/chat/entities/Channel.entity.ts](/server/src/chat/entities/Channel.entity.ts) | TypeScript | 40 | 1 | 14 | 55 |
| [server/src/chat/entities/ChannelUser.entity.ts](/server/src/chat/entities/ChannelUser.entity.ts) | TypeScript | 27 | 0 | 8 | 35 |
| [server/src/chat/entities/Message.entity.ts](/server/src/chat/entities/Message.entity.ts) | TypeScript | 18 | 0 | 8 | 26 |
| [server/src/chat/entities/MutedUser.entity.ts](/server/src/chat/entities/MutedUser.entity.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [server/src/chat/entities/index.ts](/server/src/chat/entities/index.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [server/src/chat/message/message.module.ts](/server/src/chat/message/message.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [server/src/chat/message/message.service.ts](/server/src/chat/message/message.service.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [server/src/chat/muted/muted.module.ts](/server/src/chat/muted/muted.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [server/src/chat/muted/muted.service.ts](/server/src/chat/muted/muted.service.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [server/src/client/client.tsx](/server/src/client/client.tsx) | TypeScript JSX | 0 | 0 | 1 | 1 |
| [server/src/database.module.ts](/server/src/database.module.ts) | TypeScript | 12 | 12 | 2 | 26 |
| [server/src/game/game.controller.ts](/server/src/game/game.controller.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [server/src/game/game.gateway.ts](/server/src/game/game.gateway.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [server/src/game/game.module.ts](/server/src/game/game.module.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [server/src/gateway/gateway.module.ts](/server/src/gateway/gateway.module.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [server/src/gateway/gateway.ts](/server/src/gateway/gateway.ts) | TypeScript | 54 | 11 | 8 | 73 |
| [server/src/invitations/InvitationPong.ts](/server/src/invitations/InvitationPong.ts) | TypeScript | 26 | 1 | 4 | 31 |
| [server/src/invitations/dtos/GameBall.dto.ts](/server/src/invitations/dtos/GameBall.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [server/src/invitations/dtos/GameFrame.dto.ts](/server/src/invitations/dtos/GameFrame.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [server/src/invitations/dtos/InvitationOpponent.dto.ts](/server/src/invitations/dtos/InvitationOpponent.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [server/src/invitations/dtos/InvitationRequest.dto.ts](/server/src/invitations/dtos/InvitationRequest.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [server/src/invitations/dtos/InvitationResponse.dto.ts](/server/src/invitations/dtos/InvitationResponse.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [server/src/invitations/dtos/RoomStatut.dto.ts](/server/src/invitations/dtos/RoomStatut.dto.ts) | TypeScript | 9 | 0 | 4 | 13 |
| [server/src/main.ts](/server/src/main.ts) | TypeScript | 19 | 9 | 6 | 34 |
| [server/src/match/entities/Match.entity.ts](/server/src/match/entities/Match.entity.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [server/src/match/match.module.ts](/server/src/match/match.module.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [server/src/pong/dtos/Broadcast.dto.ts](/server/src/pong/dtos/Broadcast.dto.ts) | TypeScript | 19 | 0 | 6 | 25 |
| [server/src/pong/dtos/GameEnd.dto.ts](/server/src/pong/dtos/GameEnd.dto.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [server/src/pong/dtos/UpdatePlayer.dto.ts](/server/src/pong/dtos/UpdatePlayer.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [server/src/pong/pong.gateway.ts](/server/src/pong/pong.gateway.ts) | TypeScript | 73 | 1 | 12 | 86 |
| [server/src/pong/pong.module.ts](/server/src/pong/pong.module.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [server/src/pong/pong.service.ts](/server/src/pong/pong.service.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [server/src/users/dtos/Friend.dto.ts](/server/src/users/dtos/Friend.dto.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [server/src/users/dtos/User.dto.ts](/server/src/users/dtos/User.dto.ts) | TypeScript | 11 | 1 | 2 | 14 |
| [server/src/users/dtos/UserValidation.dto.ts](/server/src/users/dtos/UserValidation.dto.ts) | TypeScript | 59 | 29 | 25 | 113 |
| [server/src/users/entities/Friend.entity.ts](/server/src/users/entities/Friend.entity.ts) | TypeScript | 25 | 0 | 7 | 32 |
| [server/src/users/entities/User.entity.ts](/server/src/users/entities/User.entity.ts) | TypeScript | 46 | 10 | 19 | 75 |
| [server/src/users/friend/friend.module.ts](/server/src/users/friend/friend.module.ts) | TypeScript | 15 | 0 | 3 | 18 |
| [server/src/users/friend/friend.service.ts](/server/src/users/friend/friend.service.ts) | TypeScript | 81 | 0 | 7 | 88 |
| [server/src/users/users.controller.ts](/server/src/users/users.controller.ts) | TypeScript | 87 | 28 | 12 | 127 |
| [server/src/users/users.module.ts](/server/src/users/users.module.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [server/src/users/users.service.ts](/server/src/users/users.service.ts) | TypeScript | 70 | 22 | 17 | 109 |
| [server/src/utils/types.ts](/server/src/utils/types.ts) | TypeScript | 36 | 6 | 6 | 48 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)