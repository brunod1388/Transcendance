# Diff Details

Date : 2023-03-19 18:59:03

Directory /Users/bruno1388/Desktop/trans/react-app/src

Total : 42 files,  168 codes, 129 comments, 26 blanks, all 323 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [src/@types/chat.types.tsx](/src/@types/chat.types.tsx) | TypeScript JSX | 1 | 0 | 1 | 2 |
| [src/@types/invitation.types.ts](/src/@types/invitation.types.ts) | TypeScript | 3 | 1 | 0 | 4 |
| [src/@types/pong.types.tsx](/src/@types/pong.types.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [src/App.tsx](/src/App.tsx) | TypeScript JSX | -2 | 0 | 0 | -2 |
| [src/components/chat/Chat.tsx](/src/components/chat/Chat.tsx) | TypeScript JSX | 2 | 0 | 0 | 2 |
| [src/components/chat/components/ChannelUsers.tsx](/src/components/chat/components/ChannelUsers.tsx) | TypeScript JSX | 9 | -1 | 0 | 8 |
| [src/components/chat/components/User.tsx](/src/components/chat/components/User.tsx) | TypeScript JSX | -8 | -1 | 0 | -9 |
| [src/components/chat/components/UserMenu.tsx](/src/components/chat/components/UserMenu.tsx) | TypeScript JSX | 35 | 0 | 1 | 36 |
| [src/components/chat/styles/message.scss](/src/components/chat/styles/message.scss) | SCSS | 0 | 0 | 1 | 1 |
| [src/components/home/Home.tsx](/src/components/home/Home.tsx) | TypeScript JSX | 39 | 0 | 1 | 40 |
| [src/components/home/components/Invitation.tsx](/src/components/home/components/Invitation.tsx) | TypeScript JSX | 9 | 0 | -1 | 8 |
| [src/components/home/components/Navbar.tsx](/src/components/home/components/Navbar.tsx) | TypeScript JSX | 3 | 0 | 0 | 3 |
| [src/components/invitations/Invitation.tsx](/src/components/invitations/Invitation.tsx) | TypeScript JSX | -60 | -6 | -9 | -75 |
| [src/components/invitations/InvitationPong.tsx](/src/components/invitations/InvitationPong.tsx) | TypeScript JSX | 43 | 1 | 7 | 51 |
| [src/components/invitations/Response.tsx](/src/components/invitations/Response.tsx) | TypeScript JSX | 53 | 0 | 7 | 60 |
| [src/components/invitations/ResponsePong.tsx](/src/components/invitations/ResponsePong.tsx) | TypeScript JSX | 40 | 0 | 6 | 46 |
| [src/components/invitations/index.ts](/src/components/invitations/index.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [src/components/notifications/NotificationBase.ts](/src/components/notifications/NotificationBase.ts) | TypeScript | -28 | 29 | 0 | 1 |
| [src/components/notifications/Notifications.tsx](/src/components/notifications/Notifications.tsx) | TypeScript JSX | -20 | 2 | -3 | -21 |
| [src/components/notifications/index.ts](/src/components/notifications/index.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [src/components/notifications/notifications.module.scss](/src/components/notifications/notifications.module.scss) | SCSS | 0 | 0 | -1 | -1 |
| [src/components/pong/Ball.ts](/src/components/pong/Ball.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/components/pong/Pong.tsx](/src/components/pong/Pong.tsx) | TypeScript JSX | 79 | 0 | 3 | 82 |
| [src/components/pong/pong.module.scss](/src/components/pong/pong.module.scss) | SCSS | 91 | -25 | 14 | 80 |
| [src/context/notifications.context.tsx](/src/context/notifications.context.tsx) | TypeScript JSX | -14 | 11 | -3 | -6 |
| [src/context/socket.context.tsx](/src/context/socket.context.tsx) | TypeScript JSX | 3 | 14 | 1 | 18 |
| [src/hooks/index.ts](/src/hooks/index.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [src/hooks/invitation/useInvitation.tsx](/src/hooks/invitation/useInvitation.tsx) | TypeScript JSX | -154 | -4 | -17 | -175 |
| [src/hooks/pong/useBall.tsx](/src/hooks/pong/useBall.tsx) | TypeScript JSX | 3 | 0 | 0 | 3 |
| [src/hooks/pong/useGame.tsx](/src/hooks/pong/useGame.tsx) | TypeScript JSX | 10 | 0 | 0 | 10 |
| [src/hooks/pong/useLoadGame.tsx](/src/hooks/pong/useLoadGame.tsx) | TypeScript JSX | 7 | 0 | 0 | 7 |
| [src/hooks/pong/usePaddle.tsx](/src/hooks/pong/usePaddle.tsx) | TypeScript JSX | 3 | 0 | 0 | 3 |
| [src/hooks/useNotificatons.tsx](/src/hooks/useNotificatons.tsx) | TypeScript JSX | 10 | 0 | 3 | 13 |
| [src/hooks/useQuery.tsx](/src/hooks/useQuery.tsx) | TypeScript JSX | -2 | -1 | 0 | -3 |
| [src/hooks/useSocket.tsx](/src/hooks/useSocket.tsx) | TypeScript JSX | -9 | 9 | 0 | 0 |
| [src/hooks/useVisible.tsx](/src/hooks/useVisible.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [src/pages/Play.tsx](/src/pages/Play.tsx) | TypeScript JSX | -91 | 92 | 0 | 1 |
| [src/pages/Settings.tsx](/src/pages/Settings.tsx) | TypeScript JSX | -1 | 1 | 0 | 0 |
| [src/utils/index.ts](/src/utils/index.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [src/utils/invitation.utils.tsx](/src/utils/invitation.utils.tsx) | TypeScript JSX | 54 | 7 | 7 | 68 |
| [src/utils/notifications.utils.tsx](/src/utils/notifications.utils.tsx) | TypeScript JSX | 36 | 0 | 5 | 41 |
| [src/utils/pong.utils.tsx](/src/utils/pong.utils.tsx) | TypeScript JSX | 12 | 0 | 1 | 13 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details