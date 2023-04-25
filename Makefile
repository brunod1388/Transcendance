COMPOSE		= docker compose -p 'ft_transcendence'

all:	up


up:
		${COMPOSE} up --build

down:
		${COMPOSE} down
prod:
	${COMPOSE} -f docker-compose.yml -f docker-compose.prod.yml up

stop:
	${COMPOSE} stop

clean:
		${COMPOSE} down --volumes --rmi all --remove-orphans

fclean:		clean
		docker system prune --volumes --all --force

re:		fclean  all

.PHONY:		all up down prod clean fclean re
