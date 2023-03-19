# Details

Date : 2023-03-19 19:02:53

Directory /Users/bruno1388/Desktop/trans/server/src

Total : 79 files,  2416 codes, 273 comments, 448 blanks, all 3137 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [src/app.module.ts](/src/app.module.ts) | TypeScript | 26 | 0 | 2 | 28 |
| [src/auth/auth.controller.ts](/src/auth/auth.controller.ts) | TypeScript | 184 | 6 | 18 | 208 |
| [src/auth/auth.module.ts](/src/auth/auth.module.ts) | TypeScript | 15 | 2 | 2 | 19 |
| [src/auth/auth.service.ts](/src/auth/auth.service.ts) | TypeScript | 195 | 17 | 27 | 239 |
| [src/auth/decorator/get-user.decorator.ts](/src/auth/decorator/get-user.decorator.ts) | TypeScript | 10 | 3 | 2 | 15 |
| [src/auth/decorator/index.ts](/src/auth/decorator/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/auth/dto/auth.dto.ts](/src/auth/dto/auth.dto.ts) | TypeScript | 14 | 10 | 7 | 31 |
| [src/auth/dto/index.ts](/src/auth/dto/index.ts) | TypeScript | 1 | 3 | 1 | 5 |
| [src/auth/guard/FortyTwo.guard.ts](/src/auth/guard/FortyTwo.guard.ts) | TypeScript | 2 | 0 | 2 | 4 |
| [src/auth/guard/index.ts](/src/auth/guard/index.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [src/auth/guard/jwt.guard.ts](/src/auth/guard/jwt.guard.ts) | TypeScript | 6 | 4 | 2 | 12 |
| [src/auth/guard/tfa.guard.ts](/src/auth/guard/tfa.guard.ts) | TypeScript | 6 | 4 | 2 | 12 |
| [src/auth/strategy/42strategy/ft.strategy.ts](/src/auth/strategy/42strategy/ft.strategy.ts) | TypeScript | 51 | 23 | 4 | 78 |
| [src/auth/strategy/42strategy/index.ts](/src/auth/strategy/42strategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/auth/strategy/JWTstrategy/index.ts](/src/auth/strategy/JWTstrategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/auth/strategy/JWTstrategy/jwt.strategy.ts](/src/auth/strategy/JWTstrategy/jwt.strategy.ts) | TypeScript | 37 | 17 | 5 | 59 |
| [src/auth/strategy/TFAstrategy/index.ts](/src/auth/strategy/TFAstrategy/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/auth/strategy/TFAstrategy/tfa.strategy.ts](/src/auth/strategy/TFAstrategy/tfa.strategy.ts) | TypeScript | 30 | 9 | 4 | 43 |
| [src/chat/blocked/blocked.module.ts](/src/chat/blocked/blocked.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/chat/blocked/blocked.service.ts](/src/chat/blocked/blocked.service.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/chat/channel/channel.module.ts](/src/chat/channel/channel.module.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [src/chat/channel/channel.service.ts](/src/chat/channel/channel.service.ts) | TypeScript | 74 | 0 | 6 | 80 |
| [src/chat/channelUser/channelUsers.module.ts](/src/chat/channelUser/channelUsers.module.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [src/chat/channelUser/channelUsers.service.ts](/src/chat/channelUser/channelUsers.service.ts) | TypeScript | 113 | 0 | 7 | 120 |
| [src/chat/chat.gateway.ts](/src/chat/chat.gateway.ts) | TypeScript | 272 | 7 | 24 | 303 |
| [src/chat/chat.module.ts](/src/chat/chat.module.ts) | TypeScript | 50 | 1 | 2 | 53 |
| [src/chat/chat.service.ts](/src/chat/chat.service.ts) | TypeScript | 20 | 11 | 5 | 36 |
| [src/chat/dtos/Channel.dto.ts](/src/chat/dtos/Channel.dto.ts) | TypeScript | 45 | 0 | 11 | 56 |
| [src/chat/dtos/ChannelUsers.dto.ts](/src/chat/dtos/ChannelUsers.dto.ts) | TypeScript | 35 | 0 | 9 | 44 |
| [src/chat/dtos/Message.dto.ts](/src/chat/dtos/Message.dto.ts) | TypeScript | 27 | 0 | 8 | 35 |
| [src/chat/entities/BlockedUser.entity.ts](/src/chat/entities/BlockedUser.entity.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [src/chat/entities/Channel.entity.ts](/src/chat/entities/Channel.entity.ts) | TypeScript | 40 | 1 | 14 | 55 |
| [src/chat/entities/ChannelUser.entity.ts](/src/chat/entities/ChannelUser.entity.ts) | TypeScript | 27 | 0 | 8 | 35 |
| [src/chat/entities/Message.entity.ts](/src/chat/entities/Message.entity.ts) | TypeScript | 25 | 0 | 8 | 33 |
| [src/chat/entities/MutedUser.entity.ts](/src/chat/entities/MutedUser.entity.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [src/chat/entities/index.ts](/src/chat/entities/index.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [src/chat/message/message.module.ts](/src/chat/message/message.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/chat/message/message.service.ts](/src/chat/message/message.service.ts) | TypeScript | 56 | 0 | 5 | 61 |
| [src/chat/muted/muted.module.ts](/src/chat/muted/muted.module.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/chat/muted/muted.service.ts](/src/chat/muted/muted.service.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [src/clients/clients.controller.ts](/src/clients/clients.controller.ts) | TypeScript | 24 | 0 | 5 | 29 |
| [src/clients/clients.module.ts](/src/clients/clients.module.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [src/clients/clients.service.ts](/src/clients/clients.service.ts) | TypeScript | 30 | 2 | 7 | 39 |
| [src/clients/dto/updateClient.dto.ts](/src/clients/dto/updateClient.dto.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/database.module.ts](/src/database.module.ts) | TypeScript | 12 | 12 | 2 | 26 |
| [src/game/dto/gameInvitation.dto.ts](/src/game/dto/gameInvitation.dto.ts) | TypeScript | 14 | 0 | 5 | 19 |
| [src/game/dto/gameResponse.dto.ts](/src/game/dto/gameResponse.dto.ts) | TypeScript | 13 | 0 | 5 | 18 |
| [src/game/game.controller.ts](/src/game/game.controller.ts) | TypeScript | 18 | 2 | 4 | 24 |
| [src/game/game.module.ts](/src/game/game.module.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/game/game.service.ts](/src/game/game.service.ts) | TypeScript | 19 | 12 | 8 | 39 |
| [src/general/dto/Broadcast.dto.ts](/src/general/dto/Broadcast.dto.ts) | TypeScript | 19 | 0 | 6 | 25 |
| [src/general/dto/GameEnd.dto.ts](/src/general/dto/GameEnd.dto.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/general/dto/invitation.dto.ts](/src/general/dto/invitation.dto.ts) | TypeScript | 14 | 0 | 5 | 19 |
| [src/general/dto/response.dto.ts](/src/general/dto/response.dto.ts) | TypeScript | 13 | 0 | 5 | 18 |
| [src/general/general.gateway.ts](/src/general/general.gateway.ts) | TypeScript | 58 | 4 | 11 | 73 |
| [src/general/general.module.ts](/src/general/general.module.ts) | TypeScript | 12 | 0 | 2 | 14 |
| [src/general/general.service.ts](/src/general/general.service.ts) | TypeScript | 66 | 15 | 11 | 92 |
| [src/invitations/InvitationPong.ts](/src/invitations/InvitationPong.ts) | TypeScript | 26 | 1 | 4 | 31 |
| [src/invitations/dtos/GameBall.dto.ts](/src/invitations/dtos/GameBall.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/invitations/dtos/GameFrame.dto.ts](/src/invitations/dtos/GameFrame.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/invitations/dtos/InvitationOpponent.dto.ts](/src/invitations/dtos/InvitationOpponent.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/invitations/dtos/InvitationRequest.dto.ts](/src/invitations/dtos/InvitationRequest.dto.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/invitations/dtos/InvitationResponse.dto.ts](/src/invitations/dtos/InvitationResponse.dto.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [src/invitations/dtos/RoomStatut.dto.ts](/src/invitations/dtos/RoomStatut.dto.ts) | TypeScript | 9 | 0 | 4 | 13 |
| [src/main.ts](/src/main.ts) | TypeScript | 19 | 9 | 6 | 34 |
| [src/match/entities/Match.entity.ts](/src/match/entities/Match.entity.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/match/match.module.ts](/src/match/match.module.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [src/pong/pong.gateway.ts](/src/pong/pong.gateway.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/users/dtos/Friend.dto.ts](/src/users/dtos/Friend.dto.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [src/users/dtos/User.dto.ts](/src/users/dtos/User.dto.ts) | TypeScript | 11 | 1 | 2 | 14 |
| [src/users/dtos/UserValidation.dto.ts](/src/users/dtos/UserValidation.dto.ts) | TypeScript | 59 | 29 | 25 | 113 |
| [src/users/entities/Friend.entity.ts](/src/users/entities/Friend.entity.ts) | TypeScript | 28 | 2 | 7 | 37 |
| [src/users/entities/User.entity.ts](/src/users/entities/User.entity.ts) | TypeScript | 46 | 10 | 19 | 75 |
| [src/users/friend/friend.module.ts](/src/users/friend/friend.module.ts) | TypeScript | 15 | 0 | 3 | 18 |
| [src/users/friend/friend.service.ts](/src/users/friend/friend.service.ts) | TypeScript | 94 | 0 | 7 | 101 |
| [src/users/users.controller.ts](/src/users/users.controller.ts) | TypeScript | 87 | 28 | 12 | 127 |
| [src/users/users.module.ts](/src/users/users.module.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/users/users.service.ts](/src/users/users.service.ts) | TypeScript | 70 | 22 | 17 | 109 |
| [src/utils/types.ts](/src/utils/types.ts) | TypeScript | 36 | 6 | 6 | 48 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)