# README

Ce projet suit une architecture microservices avec les composants suivants :

## Composants

- **config-server** : serveur de configuration Spring Cloud
- **gateway-service** : point d'entrée du système, utilisant Spring Cloud Gateway pour la gestion et le routage des requêtes, ainsi que la securité des micro services 
- **registry-service** : service de registre pour l'enregistrement des microservices
- **product-service** : service de gestion des produits 
- **user-service** : service gestion des utilisateurs
- **auth-service** : service d’authentification, fournissant JWT
- **order-service** : service de commandes
- **frontend** : react application qui implemente les fonctionnalités du backend