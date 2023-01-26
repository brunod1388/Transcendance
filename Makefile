COMPOSE		= docker compose -p 'ft_transcendence'

all:	dev


up:
		${COMPOSE} up

down:
		${COMPOSE} down
dev:
	${COMPOSE} -f docker-compose.yml -f docker-compose.dev.yml up

prod: up

clean:
		${COMPOSE} down --volumes --rmi all --remove-orphans

fclean:		clean
		docker system prune --volumes --all --force

re:		fclean  all

.PHONY:		all up down dev prod clean fclean re
