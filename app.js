const PHASES = [
  "2 groupes de 3",
  "1 groupe de 3 + 1 suite de 4",
  "1 groupe de 4 + 1 suite de 4",
  "1 suite de 7",
  "1 suite de 8",
  "1 suite de 9",
  "2 groupes de 4",
  "7 cartes d'une couleur",
  "1 groupe de 5 + 1 groupe de 2",
  "1 groupe de 5 + 1 groupe de 3"
];

const GENERIC_GAMES = [
  { id:'tarot', name:'Tarot', icon:'ti-cards', menuDesc:"Score libre à chaque donne, le plus haut total gagne", roundLabel:'donne', win:'highest', target:null, allowNegative:true, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Cumuler le plus de points possible au fil des donnes."},
      {t:"Score d'une donne", d:"Le preneur gagne ou perd des points selon la réussite de son contrat (Petite, Garde, Garde sans, Garde contre) et le nombre de bouts qu'il possède."},
      {t:"Répartition", d:"Les points du preneur sont à l'opposé de ceux des autres joueurs (ou de son partenaire à la Garde sans/contre s'il y en a un)."},
      {t:"Fin de partie", d:"Vous décidez à l'avance du nombre de donnes. Le score de chacun peut être négatif, celui qui a le plus de points à la fin gagne."}
    ]
  },
  { id:'belote', name:'Belote', icon:'ti-cards', menuDesc:"Par équipes de 2, la première à 500 points gagne", roundLabel:'donne', win:'highest', target:500, allowNegative:false, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Être la première équipe à atteindre 500 points (ou 1000 selon la variante choisie avant de jouer)."},
      {t:"Score d'une donne", d:"L'équipe qui a annoncé remporte les points de ses plis si elle atteint son contrat, sinon c'est l'équipe adverse qui empoche tous les points de la donne."},
      {t:"Belote-Rebelote", d:"L'équipe qui possède le Roi et la Dame d'atout en annonçant l'un puis l'autre marque 20 points supplémentaires."},
      {t:"Capot", d:"Une équipe qui remporte tous les plis de la donne marque 250 points au lieu du barème normal."}
    ]
  },
  { id:'coinche', name:'Coinche', icon:'ti-cards', menuDesc:"Belote contrée par équipes de 2, la première à 1000 points gagne", roundLabel:'donne', win:'highest', target:1000, allowNegative:true, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Être la première équipe à atteindre 1000 points."},
      {t:"Contrat chiffré", d:"L'équipe qui annonce un contrat (ex. 90, 100...) doit réaliser au moins ce nombre de points dans ses plis, sinon elle marque 0 et l'adversaire empoche tous les points."},
      {t:"Coinche", d:"L'équipe adverse peut contrer (coincher) un contrat : si l'annonceur échoue, les points sont doublés contre lui ; s'il réussit, ils sont doublés en sa faveur."},
      {t:"Fin de partie", d:"Note le score de chaque équipe après chaque donne, y compris négatif en cas d'échec de contrat."}
    ]
  },
  { id:'rami', name:'Rami', icon:'ti-cards', menuDesc:"Score des cartes restantes, le plus bas total gagne", roundLabel:'manche', win:'lowest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Avoir le score cumulé le plus bas possible en se débarrassant de ses cartes en combinaisons (brelans, suites)."},
      {t:"Fin de manche", d:"Dès qu'un joueur pose sa dernière carte, les autres comptent la valeur des cartes qu'il leur reste en main."},
      {t:"Valeur des cartes", d:"Les cartes numérotées valent leur valeur, les figures 10 points, l'As 1 ou 11 selon les règles choisies."},
      {t:"Fin de partie", d:"Vous décidez du nombre de manches à jouer ; celui qui a le moins de points à la fin gagne."}
    ]
  },
  { id:'rummikub', name:'Rummikub', icon:'ti-grid-dots', menuDesc:"Score des jetons restants, le plus bas total gagne", roundLabel:'manche', win:'lowest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à poser tous ses jetons, et avoir le score cumulé le plus bas sur l'ensemble de la partie."},
      {t:"Fin de manche", d:"Dès qu'un joueur pose son dernier jeton, chaque autre joueur additionne la valeur des jetons qu'il lui reste en main."},
      {t:"Premier coup", d:"La première combinaison posée par un joueur doit valoir au moins 30 points."},
      {t:"Fin de partie", d:"Jouez le nombre de manches souhaité ; le total le plus bas à la fin gagne."}
    ]
  },
  { id:'millebornes', name:'Mille Bornes', icon:'ti-car', menuDesc:"Cartes de route et d'attaque, la première équipe à 5000 points gagne", roundLabel:'manche', win:'highest', target:5000, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à parcourir 1000 bornes (ou marquer le plus de points sur plusieurs manches jusqu'à 5000)."},
      {t:"Score d'une manche", d:"1 point par borne parcourue, plus des bonus : coup fourré (+300), manche terminée (+400), sans les 200 (+300), allonge (+200), capot (+500), coup du couronnement (+300)."},
      {t:"Attaques et parades", d:"Les cartes attaque (Panne, Crevaison, Accident, Feu rouge, Limite de vitesse) bloquent l'adversaire tant qu'il n'a pas la parade correspondante."},
      {t:"Fin de partie", d:"Le premier à atteindre 5000 points cumulés sur plusieurs manches remporte la partie."}
    ]
  },
  { id:'sixquiprend', name:'6 qui prend', icon:'ti-cards', menuDesc:"Cumule le moins de têtes de bœuf possible, fin à 66 points", roundLabel:'manche', win:'lowest', target:66, allowNegative:false, calculatorValues:[1,2,3,5,7], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Avoir le moins de « têtes de bœuf » possible en évitant de ramasser la 6e carte d'une rangée."},
      {t:"Valeur des cartes", d:"Chaque carte porte de 1 à 7 têtes de bœuf selon sa valeur (les multiples de 10, de 5 ou le 55 valent plus)."},
      {t:"Fin de manche", d:"La manche se termine quand toutes les cartes ont été jouées ; chacun compte les têtes de bœuf ramassées."},
      {t:"Fin de partie", d:"Dès qu'un joueur atteint 66 points, la partie s'arrête : celui qui a le moins de points gagne."}
    ]
  },
  { id:'yams', name:'Yams', icon:'ti-dice-5', menuDesc:"Additionne les catégories de dés, le plus haut score gagne", roundLabel:'partie', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Remplir les 13 catégories de sa grille (brelan, full, suite, yams...) pour obtenir le meilleur total possible."},
      {t:"Bonus haut de grille", d:"Si le total des catégories 1 à 6 atteint 63 points ou plus, un bonus de 35 points est ajouté."},
      {t:"Yams", d:"Obtenir les 5 dés identiques rapporte 50 points ; un yams supplémentaire dans la partie rapporte un bonus additionnel selon les règles choisies."},
      {t:"Utilisation ici", d:"Entre simplement le score total final de chaque joueur une fois sa grille complète."}
    ]
  },
  { id:'backgammon', name:'Backgammon', icon:'ti-square', menuDesc:"Points par partie, le premier à 21 gagne le match", roundLabel:'partie', win:'highest', target:21, allowNegative:false, calculatorValues:[1,2,3,4,6,8], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Sortir tous ses pions du plateau avant l'adversaire pour remporter la partie."},
      {t:"Valeur d'une partie", d:"1 point normalement, 2 points en cas de gammon (l'adversaire n'a sorti aucun pion), 3 points en cas de backgammon (l'adversaire a encore un pion dans le camp du vainqueur ou sur la barre)."},
      {t:"Doublement", d:"Le cube de doublement peut multiplier la mise (x2, x4, x8...) si vous jouez avec cette règle."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de points fixé avant la partie (21 par défaut) remporte le match."}
    ]
  },
  { id:'molkky', name:'Molkky', icon:'ti-target', menuDesc:"Quilles finlandaises, premier à exactement 50 points", roundLabel:'lancer', win:'highest', target:50, targetExact:true, bustReset:25, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier joueur à atteindre exactement 50 points."},
      {t:"Marquer les points", d:"Si une seule quille tombe, son numéro est ajouté au score. Si plusieurs quilles tombent, le score gagné est égal au nombre de quilles tombées."},
      {t:"Dépassement de 50", d:"Si un lancer fait dépasser 50 points, le score du joueur redescend automatiquement à 25 points (le site le calcule pour toi)."},
      {t:"Élimination", d:"Certaines variantes éliminent un joueur qui rate 3 lancers de suite — à vous de l'appliquer si vous le souhaitez."}
    ]
  },
  { id:'bridge', name:'Bridge', icon:'ti-cards', menuDesc:"Score libre par donne, le plus haut total gagne", roundLabel:'donne', win:'highest', target:null, allowNegative:true, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Cumuler le plus de points possible au fil des donnes en remportant des levées selon le contrat annoncé aux enchères."},
      {t:"Score d'une donne", d:"Les points dépendent du contrat (couleur, sans-atout), du nombre de levées réalisées, des contrats chelem, et des points d'honneurs."},
      {t:"Chute", d:"Si le contrat n'est pas réalisé, l'équipe adverse marque des points de pénalité."},
      {t:"Fin de partie", d:"Vous décidez à l'avance du nombre de donnes ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'whist', name:'Whist', icon:'ti-cards', menuDesc:"Un point par pli remporté, le plus haut total gagne", roundLabel:'donne', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Remporter le plus de plis possible à chaque donne."},
      {t:"Score d'une donne", d:"Chaque pli remporté au-delà des 6 premiers rapporte 1 point (variantes possibles selon les règles choisies)."},
      {t:"Atout", d:"La dernière carte retournée détermine la couleur d'atout de la donne."},
      {t:"Fin de partie", d:"Jouez le nombre de donnes voulu ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'manille', name:'Manille', icon:'ti-cards', menuDesc:"Par équipes de 2, la première à 500 points gagne", roundLabel:'donne', win:'highest', target:500, allowNegative:false, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Être la première équipe à atteindre 500 points en remportant des plis à chaque donne."},
      {t:"Valeur des cartes", d:"Le 10 (Manille) vaut le plus, suivi de l'As, du Roi, de la Dame, du Valet, puis des cartes basses."},
      {t:"Atout", d:"Une couleur d'atout est choisie à chaque donne, ses cartes valent plus que les autres couleurs."},
      {t:"Fin de partie", d:"La première équipe à atteindre 500 points remporte la partie."}
    ]
  },
  { id:'coeur', name:'Cœur (Hearts)', icon:'ti-cards', menuDesc:"Évite les cœurs et la dame de pique, fin à 100 points", roundLabel:'manche', win:'lowest', target:100, allowNegative:false, calculatorValues:[1,13], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Éviter de ramasser des cœurs et surtout la Dame de pique, qui rapportent des points de pénalité."},
      {t:"Valeur des cartes", d:"Chaque cœur vaut 1 point, la Dame de pique vaut 13 points."},
      {t:"La Chasse-Cœur", d:"Si un joueur ramasse tous les cœurs et la Dame de pique dans la même manche, il marque 0 et tous les autres marquent 26 points."},
      {t:"Fin de partie", d:"Dès qu'un joueur atteint 100 points, la partie s'arrête : celui qui a le moins de points gagne."}
    ]
  },
  { id:'spades', name:'Spades', icon:'ti-cards', menuDesc:"Par équipes, annonce tes plis, la première équipe à 500 points gagne", roundLabel:'donne', win:'highest', target:500, allowNegative:true, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Annoncer avant la donne le nombre de plis que l'on pense remporter, puis réaliser ce contrat."},
      {t:"Score d'une donne", d:"Réaliser exactement son contrat rapporte 10 points par pli annoncé ; les plis en plus rapportent 1 point chacun (sacs), les plis manquants font perdre 10 points par pli annoncé."},
      {t:"Pique atout", d:"La couleur pique est toujours atout et ne peut être jouée qu'après avoir été « cassée »."},
      {t:"Fin de partie", d:"La première équipe à atteindre 500 points gagne."}
    ]
  },
  { id:'canasta', name:'Canasta', icon:'ti-cards', menuDesc:"Combinaisons de cartes, la première équipe à 5000 points gagne", roundLabel:'manche', win:'highest', target:5000, allowNegative:true, calculatorValues:null, playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Former des combinaisons de 3 cartes ou plus (canastas) pour marquer un maximum de points."},
      {t:"Canasta", d:"Une combinaison de 7 cartes ou plus rapporte un gros bonus (500 points pour une canasta pure, 300 pour une mixte)."},
      {t:"Fin de manche", d:"La manche se termine quand un joueur ou une équipe se débarrasse de toutes ses cartes."},
      {t:"Fin de partie", d:"La première équipe à atteindre 5000 points cumulés gagne."}
    ]
  },
  { id:'dames', name:'Dames', icon:'ti-square', menuDesc:"Compte les victoires, premier à 5 parties gagnées remporte le match", roundLabel:'partie', win:'highest', target:5, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Capturer tous les pions adverses ou les bloquer pour qu'ils ne puissent plus bouger."},
      {t:"Une victoire", d:"Chaque partie gagnée rapporte 1 point (clique sur +1 pour le vainqueur de chaque partie)."},
      {t:"Dame", d:"Un pion qui atteint la dernière rangée devient une dame et peut se déplacer sur plusieurs cases."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (5 par défaut) remporte le match."}
    ]
  },
  { id:'awale', name:'Awalé', icon:'ti-circles', menuDesc:"Capture les graines, premier à 25 graines capturées gagne", roundLabel:'partie', win:'highest', target:25, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Capturer plus de graines que l'adversaire en semant les graines de ses trous un à un dans les trous suivants."},
      {t:"Capturer", d:"On capture les graines d'un trou adverse quand, après avoir semé, ce trou contient 2 ou 3 graines."},
      {t:"Score d'une partie", d:"Entre le nombre de graines capturées par chaque joueur à la fin de la partie."},
      {t:"Fin de partie", d:"Le premier joueur à cumuler 25 graines capturées (sur la majorité des 48 graines du jeu) remporte la partie."}
    ]
  },
  { id:'petitbac', name:'Petit Bac', icon:'ti-abc', menuDesc:"Trouve un mot par catégorie et par lettre, le plus haut total gagne", roundLabel:'lettre', win:'highest', target:null, allowNegative:false, calculatorValues:[5,10], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Pour une lettre tirée au sort, trouver un mot dans chaque catégorie (prénom, animal, pays, fruit...) le plus vite possible."},
      {t:"Score d'un mot", d:"Un mot valide unique rapporte 10 points, un mot valide partagé avec un autre joueur rapporte 5 points, un mot invalide ou manquant rapporte 0."},
      {t:"Fin de manche", d:"Dès qu'un joueur a rempli toutes ses catégories, il crie « stop » et tout le monde compte ses points pour cette lettre."},
      {t:"Fin de partie", d:"Jouez autant de lettres que vous voulez ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'domino', name:'Domino', icon:'ti-grid-dots', menuDesc:"Compte les points restants, fin à 100 points, le plus bas gagne", roundLabel:'manche', win:'lowest', target:100, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à poser tous ses dominos, et avoir le score cumulé le plus bas sur la partie."},
      {t:"Fin de manche", d:"Dès qu'un joueur pose son dernier domino (ou que la partie est bloquée), chacun compte les points restants sur ses dominos non posés."},
      {t:"Blocage", d:"Si plus personne ne peut jouer, chacun compte ses points restants, même sans avoir tout posé."},
      {t:"Fin de partie", d:"Dès qu'un joueur atteint 100 points, la partie s'arrête : celui qui a le moins de points gagne."}
    ]
  },
  { id:'trivialpursuit', name:'Trivial Pursuit', icon:'ti-bulb', menuDesc:"Récupère un camembert par bonne réponse dans chaque catégorie", roundLabel:'camembert gagné', win:'highest', target:6, allowNegative:false, calculatorValues:[1], playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Être la première équipe à récupérer les 6 camemberts (un par catégorie) puis répondre correctement dans la case centrale."},
      {t:"Gagner un camembert", d:"Répondre correctement à une question posée sur une case camembert de la catégorie correspondante."},
      {t:"Utilisation ici", d:"Clique sur +1 pour l'équipe qui remporte un camembert."},
      {t:"Fin de partie", d:"Dès qu'une équipe a ses 6 camemberts, la partie s'arrête."}
    ]
  },
  { id:'puissance4', name:'Puissance 4', icon:'ti-grid-dots', menuDesc:"Compte les victoires, premier à 5 parties gagnées remporte le match", roundLabel:'partie', win:'highest', target:5, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Aligner 4 jetons de sa couleur (horizontalement, verticalement ou en diagonale) avant l'adversaire."},
      {t:"Une victoire", d:"Chaque partie gagnée rapporte 1 point (clique sur +1 pour le vainqueur)."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (5 par défaut) remporte le match."}
    ]
  },
  { id:'morpion', name:'Morpion', icon:'ti-grid-dots', menuDesc:"Compte les victoires, premier à 5 parties gagnées remporte le match", roundLabel:'partie', win:'highest', target:5, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Aligner 3 symboles (croix ou ronds) sur la grille avant l'adversaire."},
      {t:"Une victoire", d:"Chaque partie gagnée rapporte 1 point (clique sur +1 pour le vainqueur)."},
      {t:"Match nul", d:"Si personne n'aligne 3 symboles, la partie ne rapporte de point à personne."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (5 par défaut) remporte le match."}
    ]
  },
  { id:'bataillenavale', name:'Bataille navale', icon:'ti-anchor', menuDesc:"Compte les victoires, premier à 3 flottes coulées remporte le match", roundLabel:'partie', win:'highest', target:3, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Couler tous les navires de la flotte adverse avant que l'adversaire ne coule la sienne."},
      {t:"Une victoire", d:"Chaque flotte coulée rapporte 1 point (clique sur +1 pour le vainqueur de la partie)."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (3 par défaut) remporte le match."}
    ]
  },
  { id:'cluedo', name:'Cluedo', icon:'ti-search', menuDesc:"Compte les enquêtes résolues, premier à 3 victoires remporte le match", roundLabel:'enquête résolue', win:'highest', target:3, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à découvrir le coupable, l'arme et la pièce du crime en interrogeant les autres joueurs."},
      {t:"Une victoire", d:"Résoudre l'enquête en premier rapporte 1 point (clique sur +1 pour le gagnant de la partie)."},
      {t:"Accusation ratée", d:"Un joueur qui se trompe en accusation est éliminé du reste de la manche."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (3 par défaut) remporte le match."}
    ]
  },
  { id:'monopoly', name:'Monopoly', icon:'ti-building', menuDesc:"Entre la fortune finale de chaque partie, le plus haut total gagne", roundLabel:'partie', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Ruiner tous les autres joueurs en achetant et développant des propriétés."},
      {t:"Fin de partie", d:"La partie se termine quand il ne reste qu'un seul joueur non ruiné, ou après un temps fixé à l'avance."},
      {t:"Score d'une partie", d:"Entre la fortune totale (argent + valeur des biens) de chaque joueur à la fin."},
      {t:"Sur plusieurs parties", d:"Rejouez autant de parties que vous voulez ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'scrabble', name:'Scrabble', icon:'ti-abc', menuDesc:"Score de mots croisés, le plus haut total gagne", roundLabel:'partie', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Former des mots sur la grille pour marquer un maximum de points, en exploitant les cases bonus."},
      {t:"Score d'un mot", d:"La valeur des lettres est multipliée selon les cases lettre/mot compte double ou triple utilisées."},
      {t:"Scrabble", d:"Poser ses 7 lettres d'un coup rapporte un bonus de 50 points."},
      {t:"Fin de partie", d:"Entre le score final de chaque joueur une fois toutes les lettres jouées."}
    ]
  },
  { id:'boggle', name:'Boggle / Ligretto', icon:'ti-letter-case', menuDesc:"Score de mots trouvés, le plus haut total gagne", roundLabel:'manche', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Trouver un maximum de mots en reliant des lettres adjacentes dans le temps imparti."},
      {t:"Score d'un mot", d:"Plus un mot est long, plus il rapporte de points (souvent 1 point pour 3 lettres, puis en augmentant)."},
      {t:"Mots communs", d:"Un mot trouvé par plusieurs joueurs ne rapporte de points à personne selon les règles classiques."},
      {t:"Fin de partie", d:"Jouez autant de manches que voulu ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'mahjong', name:'Mahjong', icon:'ti-grid-dots', menuDesc:"Score libre par manche, le plus haut total gagne", roundLabel:'manche', win:'highest', target:null, allowNegative:true, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Former une main complète de combinaisons (brelans, suites, paire) avant les autres joueurs."},
      {t:"Score d'une manche", d:"Le gagnant marque des points selon la difficulté de sa combinaison ; les autres peuvent perdre des points."},
      {t:"Fin de partie", d:"Vous décidez du nombre de manches à jouer ; le total le plus élevé à la fin gagne."}
    ]
  },
  { id:'catane', name:'Les Colons de Catane', icon:'ti-triangle', menuDesc:"Points de victoire, premier à 10 points remporte la partie", roundLabel:'tour', win:'highest', target:10, allowNegative:false, calculatorValues:[1,2], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier joueur à atteindre 10 points de victoire en développant son territoire."},
      {t:"Gagner des points", d:"Colonies (1 pt), villes (2 pts), plus longue route, plus grande armée et cartes développement rapportent des points."},
      {t:"Utilisation ici", d:"Ajoute les points gagnés à chaque tour où tu progresses."},
      {t:"Fin de partie", d:"Dès qu'un joueur atteint 10 points lors de son tour, il remporte immédiatement la partie."}
    ]
  },
  { id:'splendor', name:'Splendor', icon:'ti-diamond', menuDesc:"Points de prestige, premier à 15 points déclenche la fin de partie", roundLabel:'tour', win:'highest', target:15, allowNegative:false, calculatorValues:[1,2,3,4,5], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Accumuler des cartes de développement et des cartes prestige en achetant des gemmes."},
      {t:"Gagner des points", d:"Chaque carte achetée ou réservée peut rapporter des points de prestige selon sa valeur."},
      {t:"Fin de partie", d:"Dès qu'un joueur atteint 15 points, le tour en cours se termine puis la partie s'arrête : le plus haut score gagne."}
    ]
  },
  { id:'carcassonne', name:'Carcassonne', icon:'ti-castle', menuDesc:"Score de tuiles posées, le plus haut total gagne", roundLabel:'partie', win:'highest', target:null, allowNegative:false, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Construire routes, villes, monastères et prés en plaçant des tuiles et en y posant ses meeples."},
      {t:"Score", d:"Chaque construction terminée rapporte des points immédiatement ; les prés et constructions inachevées rapportent des points à la fin de la partie."},
      {t:"Utilisation ici", d:"Entre le score final de chaque joueur une fois toutes les tuiles posées."}
    ]
  },
  { id:'skipbo', name:'Skip-Bo', icon:'ti-cards', menuDesc:"Compte les manches gagnées, premier à 3 manches remporte la partie", roundLabel:'manche gagnée', win:'highest', target:3, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à vider sa pile de réserve en posant ses cartes dans l'ordre sur les piles centrales."},
      {t:"Une manche", d:"Le premier joueur à vider sa pile remporte la manche (clique sur +1 pour lui)."},
      {t:"Fin de partie", d:"Le premier joueur à remporter le nombre de manches fixé (3 par défaut) gagne la partie."}
    ]
  },
  { id:'loto', name:'Loto / Bingo', icon:'ti-ticket', menuDesc:"Compte les cartons complétés, premier à 3 gagne la partie", roundLabel:'carton complété', win:'highest', target:3, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à cocher tous les numéros de son carton au fur et à mesure du tirage."},
      {t:"Un carton", d:"Chaque carton complété en premier rapporte 1 point (clique sur +1 pour le gagnant)."},
      {t:"Fin de partie", d:"Le premier joueur à atteindre le nombre de cartons fixé (3 par défaut) remporte la partie."}
    ]
  },
  { id:'blackjack', name:'Blackjack (21)', icon:'ti-cards', menuDesc:"Suis tes jetons manche après manche, score libre", roundLabel:'manche', win:'highest', target:null, allowNegative:true, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Avoir une main dont la valeur est la plus proche de 21 possible sans la dépasser, en battant la banque."},
      {t:"Score d'une manche", d:"Note ce que chaque joueur gagne ou perd de jetons à chaque manche (peut être négatif)."},
      {t:"Fin de partie", d:"Jouez autant de manches que voulu ; le total de jetons le plus élevé à la fin gagne."}
    ]
  },
  { id:'poker', name:'Poker', icon:'ti-cards', menuDesc:"Suis tes jetons manche après manche, score libre", roundLabel:'manche', win:'highest', target:null, allowNegative:true, calculatorValues:null, playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Remporter le pot en ayant la meilleure main à l'abattage, ou en faisant coucher tous les adversaires."},
      {t:"Score d'une manche", d:"Note ce que chaque joueur gagne ou perd de jetons à chaque manche (peut être négatif)."},
      {t:"Fin de partie", d:"Jouez autant de manches que voulu ; le total de jetons le plus élevé à la fin gagne."}
    ]
  },
  { id:'timesup', name:"Time's Up", icon:'ti-clock', menuDesc:"Par équipes, fais deviner un maximum de mots", roundLabel:'manche', win:'highest', target:null, allowNegative:false, calculatorValues:[1], playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Faire deviner un maximum de personnages ou de mots à son équipe en un temps limité, sur 3 manches aux règles différentes (description libre, un mot, mime)."},
      {t:"Score d'une manche", d:"Chaque mot deviné correctement rapporte 1 point à l'équipe (clique sur +1 pour chaque mot deviné)."},
      {t:"Fin de partie", d:"Vous décidez du nombre de manches ; l'équipe avec le plus de points à la fin gagne."}
    ]
  },
  { id:'pictionary', name:'Pictionary', icon:'ti-pencil', menuDesc:"Par équipes, dessine et fais deviner, première à 20 points gagne", roundLabel:'manche', win:'highest', target:20, allowNegative:false, calculatorValues:[1,2,3], playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Faire deviner un mot à son équipe en le dessinant, sans parler ni écrire de lettres ou chiffres."},
      {t:"Score d'une manche", d:"Une bonne réponse rapporte des points selon la difficulté du mot ou la rapidité de la manche."},
      {t:"Fin de partie", d:"La première équipe à atteindre le nombre de points fixé (20 par défaut) remporte la partie."}
    ]
  },
  { id:'mimes', name:'Mimes (Charades)', icon:'ti-yoga', menuDesc:"Par équipes, mime un mot sans parler, score libre", roundLabel:'manche', win:'highest', target:null, allowNegative:false, calculatorValues:[1], playerWord:'Équipe',
    rules:[
      {t:"But du jeu", d:"Faire deviner un mot ou une expression à son équipe uniquement par des gestes, sans parler."},
      {t:"Score d'une manche", d:"Chaque mot deviné correctement rapporte 1 point à l'équipe (clique sur +1 pour chaque mot deviné)."},
      {t:"Fin de partie", d:"Vous décidez du nombre de manches ; l'équipe avec le plus de points à la fin gagne."}
    ]
  },
  { id:'abalone', name:'Abalone', icon:'ti-circles', menuDesc:"Compte les victoires, premier à 2 parties gagnées remporte le match", roundLabel:'partie', win:'highest', target:2, allowNegative:false, calculatorValues:[1], playerWord:'Joueur',
    rules:[
      {t:"But du jeu", d:"Être le premier à pousser 6 billes adverses hors du plateau."},
      {t:"Une victoire", d:"Chaque partie gagnée rapporte 1 point (clique sur +1 pour le vainqueur)."},
      {t:"Fin de match", d:"Le premier joueur à atteindre le nombre de victoires fixé (2 par défaut) remporte le match."}
    ]
  }
];

let state = {
  game: 'menu',
  phase10: { players: [], rounds: [] },
  uno: { players: [], rounds: [], target: 500 },
  petanque: { players: [], rounds: [] },
  skyjo: { players: [], rounds: [] },
  generic: {}
};
let calcState = {};

function uid(){ return Math.random().toString(36).slice(2,9); }
function escapeHtml(str){ const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

async function loadState(){
  try{
    const raw = localStorage.getItem('multigame-state');
    if(raw){
      const parsed = JSON.parse(raw);
      state = Object.assign(state, parsed);
      state.game = 'menu';
    }
  }catch(e){}
  render();
}
async function saveState(){
  try{ localStorage.setItem('multigame-state', JSON.stringify(state)); }
  catch(e){}
}

function findGenericCfg(id){ return GENERIC_GAMES.find(g=>g.id===id); }

function renderMenuCards(){
  const zone = document.getElementById('genericMenuCards');
  zone.innerHTML = GENERIC_GAMES.map(cfg => `
    <button class="gameCard" data-game="generic:${cfg.id}" data-search="${escapeHtml(cfg.name.toLowerCase())}">
      <div class="icon"><i class="ti ${cfg.icon}"></i></div>
      <div class="info">
        <h3>${cfg.name}</h3>
        <p>${cfg.menuDesc}</p>
      </div>
      <div class="arrow"><i class="ti ti-chevron-right"></i></div>
    </button>
  `).join('');
  zone.querySelectorAll('.gameCard').forEach(c=>{
    c.addEventListener('click', ()=> goTo(c.dataset.game));
  });
}

function normalizeSearch(str){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function filterGames(){
  const query = normalizeSearch(document.getElementById('gameSearch').value);
  const cards = document.querySelectorAll('#menuGrid .gameCard');
  let visibleCount = 0;
  cards.forEach(card=>{
    const haystack = normalizeSearch(card.dataset.search || '');
    const match = query==='' || haystack.includes(query);
    card.style.display = match ? '' : 'none';
    if(match) visibleCount++;
  });
  document.getElementById('noResults').style.display = visibleCount===0 ? 'block' : 'none';
}
document.getElementById('gameSearch').addEventListener('input', filterGames);

function goTo(game){
  state.game = game;
  calcState = {};
  renderHeader();
  document.querySelectorAll('.gameView').forEach(v=>v.classList.remove('active'));
  if(game.startsWith('generic:')){
    const id = game.split(':')[1];
    const cfg = findGenericCfg(id);
    if(!state.generic[id]) state.generic[id] = { players:[], rounds:[] };
    const el = ensureGenericView(cfg);
    el.classList.add('active');
  } else {
    document.getElementById('view-'+game).classList.add('active');
  }
  render();
}

function renderHeader(){
  const map = {
    menu: { eyebrow:'Feuille de marque', title:'Nos <span>jeux</span>', sub:"Choisis un jeu pour ouvrir sa feuille de score." },
    phase10: { eyebrow:'Feuille de marque', title:'Phase <span>10</span>', sub:"Calcule les scores, suis les phases, désigne le vainqueur." },
    uno: { eyebrow:'Feuille de marque', title:'<span>Uno</span>', sub:"Suis le score et l'objectif à atteindre." },
    petanque: { eyebrow:'Feuille de marque', title:'Pé<span>tanque</span>', sub:"Suis le score, mène après mène, jusqu'à 13." },
    skyjo: { eyebrow:'Feuille de marque', title:'<span>Skyjo</span>', sub:"Le score le plus bas gagne — attention à la règle du double." }
  };
  if(state.game.startsWith('generic:')){
    const id = state.game.split(':')[1];
    const cfg = findGenericCfg(id);
    document.getElementById('eyebrowText').textContent = 'Feuille de marque';
    document.getElementById('mainTitle').innerHTML = cfg.name;
    document.getElementById('subTitle').textContent = cfg.menuDesc;
    return;
  }
  const m = map[state.game];
  document.getElementById('eyebrowText').textContent = m.eyebrow;
  document.getElementById('mainTitle').innerHTML = m.title;
  document.getElementById('subTitle').textContent = m.sub;
}

document.querySelectorAll('.gameCard').forEach(c=>{
  c.addEventListener('click', ()=> goTo(c.dataset.game));
});
document.querySelectorAll('[data-back]').forEach(b=>{
  b.addEventListener('click', ()=> goTo('menu'));
});

function render(){
  if(state.game==='phase10') renderPhase10();
  if(state.game==='uno') renderUno();
  if(state.game==='petanque') renderPetanque();
  if(state.game==='skyjo') renderSkyjo();
  if(state.game.startsWith('generic:')){
    const cfg = findGenericCfg(state.game.split(':')[1]);
    renderGeneric(cfg);
  }
}

/* ============ PHASE 10 ============ */
function p10AddPlayer(){
  const input = document.getElementById('p10-newName');
  const name = input.value.trim();
  if(!name) return;
  state.phase10.players.push({ id: uid(), name, phase: 1 });
  input.value=''; saveState(); renderPhase10();
}
function p10RemovePlayer(id){
  state.phase10.players = state.phase10.players.filter(p=>p.id!==id);
  state.phase10.rounds.forEach(r=>{ delete r.scores[id]; });
  saveState(); renderPhase10();
}
function p10TotalScore(pid){ return state.phase10.rounds.reduce((s,r)=> s + (r.scores[pid]?.score||0), 0); }
function p10CardValue(kind){ if(kind==='skip') return 15; if(kind==='wild') return 25; return kind; }

function renderPhase10(){
  const zone = document.getElementById('p10-setupRow');
  zone.innerHTML='';
  state.phase10.players.forEach(p=>{
    const chip = document.createElement('div'); chip.className='playerchip';
    chip.innerHTML = `<span>${escapeHtml(p.name)}</span>`;
    const del = document.createElement('button'); del.innerHTML='&times;';
    del.onclick = ()=>p10RemovePlayer(p.id);
    chip.appendChild(del); zone.appendChild(chip);
  });

  const ladderCard = document.getElementById('p10-ladderCard');
  const ladderZone = document.getElementById('p10-ladderZone');
  ladderZone.innerHTML='';
  if(state.phase10.players.length===0){ ladderCard.style.display='none'; }
  else{
    ladderCard.style.display='block';
    const ranked = [...state.phase10.players].sort((a,b)=>{
      if(b.phase !== a.phase) return b.phase - a.phase;
      return p10TotalScore(a.id) - p10TotalScore(b.id);
    });
    ranked.forEach(p=>{
      const won = p.phase > 10;
      const row = document.createElement('div'); row.className='ladderRow';
      const name = document.createElement('div'); name.className='ladderName';
      name.innerHTML = escapeHtml(p.name) + (won ? '<span class="crown"><i class="ti ti-crown"></i></span>' : '');
      row.appendChild(name);
      const ladder = document.createElement('div'); ladder.className='ladder';
      for(let i=1;i<=10;i++){
        const c = document.createElement('div');
        c.className='pcard' + (i < p.phase || won ? ' done' : (i===p.phase ? ' current' : ''));
        c.textContent = i; c.title = PHASES[i-1];
        ladder.appendChild(c);
      }
      row.appendChild(ladder);
      const score = document.createElement('div'); score.className='ladderScore'; score.textContent = p10TotalScore(p.id);
      row.appendChild(score);
      ladderZone.appendChild(row);
    });
    const anyWinner = state.phase10.players.find(p=>p.phase>10);
    document.getElementById('p10-winnerZone').innerHTML = anyWinner
      ? `<div class="winnerBanner">${escapeHtml(anyWinner.name)} remporte la partie — phase 10 complétée, ${p10TotalScore(anyWinner.id)} points</div>` : '';
  }

  const roundCard = document.getElementById('p10-roundCard');
  const grid = document.getElementById('p10-roundGrid');
  grid.innerHTML='';
  if(state.phase10.players.length===0){ roundCard.style.display='none'; }
  else{
    roundCard.style.display='block';
    state.phase10.players.forEach(p=>{
      if(!calcState[p.id]) calcState[p.id] = { open:false, items:[] };
      const row = document.createElement('div'); row.className='roundPlayer';
      const name = document.createElement('div'); name.className='rname'; name.textContent = p.name;
      row.appendChild(name);
      const check = document.createElement('label'); check.className='checklabel';
      check.innerHTML = `<input type="checkbox" id="p10-done-${p.id}"><span>Phase ${p.phase>10?10:p.phase} validée</span>`;
      row.appendChild(check);
      const scoreWrap = document.createElement('div'); scoreWrap.style.display='flex';scoreWrap.style.alignItems='center';scoreWrap.style.gap='6px';
      const scoreInput = document.createElement('input'); scoreInput.type='number'; scoreInput.min='0'; scoreInput.className='scoreInput';
      scoreInput.id = 'p10-score-'+p.id; scoreInput.placeholder='0';
      scoreWrap.appendChild(scoreInput);
      const calcBtn = document.createElement('button'); calcBtn.type='button'; calcBtn.className='calcToggle'; calcBtn.textContent='calculer';
      calcBtn.onclick = ()=>{ calcState[p.id].open = !calcState[p.id].open; renderPhase10(); };
      scoreWrap.appendChild(calcBtn); row.appendChild(scoreWrap);

      const calcBox = document.createElement('div'); calcBox.className='calcBox' + (calcState[p.id].open ? ' open':'');
      const cardDefs = [1,2,3,4,5,6,7,8,9,'10/11/12','skip','wild'];
      cardDefs.forEach(def=>{
        const btn = document.createElement('button'); btn.type='button';
        btn.className='cbtn' + (def==='skip'?' skip':def==='wild'?' wild':'');
        const val = def==='10/11/12' ? 10 : def==='skip' ? 'skip' : def==='wild' ? 'wild' : def;
        btn.textContent = def==='skip' ? 'Skip +15' : def==='wild' ? 'Wild +25' : (def==='10/11/12' ? '10/11/12' : def+'');
        btn.onclick = ()=>{ calcState[p.id].items.push(p10CardValue(val)); p10UpdateCalcSum(p.id); };
        calcBox.appendChild(btn);
      });
      const undoBtn = document.createElement('button'); undoBtn.type='button'; undoBtn.className='cbtn';
      undoBtn.innerHTML='<i class="ti ti-backspace"></i>';
      undoBtn.onclick = ()=>{ calcState[p.id].items.pop(); p10UpdateCalcSum(p.id); };
      calcBox.appendChild(undoBtn);
      const sum = document.createElement('span'); sum.className='calcSum'; sum.id = 'p10-sum-'+p.id;
      calcBox.appendChild(sum);
      row.appendChild(calcBox);
      grid.appendChild(row);
      p10UpdateCalcSum(p.id);
    });
  }

  const historyCard = document.getElementById('p10-historyCard');
  const table = document.getElementById('p10-historyTable');
  table.innerHTML='';
  if(state.phase10.rounds.length===0 || state.phase10.players.length===0){ historyCard.style.display='none'; }
  else{
    historyCard.style.display='block';
    const thead = document.createElement('tr');
    thead.innerHTML = '<th>Manche</th>' + state.phase10.players.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('') + '<th></th>';
    table.appendChild(thead);
    state.phase10.rounds.forEach((r,idx)=>{
      const tr = document.createElement('tr');
      let cells = `<td>${idx+1}</td>`;
      state.phase10.players.forEach(p=>{
        const s = r.scores[p.id];
        const val = s ? s.score : '—';
        const mark = s && s.done ? ' <i class="ti ti-check" style="color:var(--gold)"></i>' : '';
        cells += `<td>${val}${mark}</td>`;
      });
      cells += `<td><button class="roundDel" onclick="p10DeleteRound('${r.id}')"><i class="ti ti-trash"></i></button></td>`;
      tr.innerHTML = cells; table.appendChild(tr);
    });
    const totalTr = document.createElement('tr'); totalTr.className='totalrow';
    let totalCells = '<td>Total</td>';
    state.phase10.players.forEach(p=> totalCells += `<td>${p10TotalScore(p.id)}</td>`);
    totalCells += '<td></td>'; totalTr.innerHTML = totalCells; table.appendChild(totalTr);
  }
}
function p10UpdateCalcSum(pid){
  const el = document.getElementById('p10-sum-'+pid); if(!el) return;
  const items = calcState[pid].items; const total = items.reduce((a,b)=>a+b,0);
  el.textContent = items.length ? `= ${total} pts (${items.length} carte${items.length>1?'s':''})` : '';
  const input = document.getElementById('p10-score-'+pid);
  if(input && items.length) input.value = total;
}
function p10ValidateRound(){
  if(state.phase10.players.length===0) return;
  const scores = {};
  state.phase10.players.forEach(p=>{
    const scoreInput = document.getElementById('p10-score-'+p.id);
    const doneBox = document.getElementById('p10-done-'+p.id);
    const score = parseInt(scoreInput.value,10) || 0;
    const done = doneBox.checked;
    scores[p.id] = { score, phase: p.phase>10?10:p.phase, done };
    if(done && p.phase<=10) p.phase += 1;
  });
  state.phase10.rounds.push({ id: uid(), scores });
  calcState = {}; saveState(); renderPhase10();
}
function p10DeleteRound(roundId){
  const round = state.phase10.rounds.find(r=>r.id===roundId);
  if(round){
    Object.keys(round.scores).forEach(pid=>{
      if(round.scores[pid].done){
        const p = state.phase10.players.find(x=>x.id===pid);
        if(p && p.phase>1) p.phase -= 1;
      }
    });
  }
  state.phase10.rounds = state.phase10.rounds.filter(r=>r.id!==roundId);
  saveState(); renderPhase10();
}
function p10RenderRules(){
  document.getElementById('p10-rulesList').innerHTML = PHASES.map((p,i)=>`<div><span>Phase ${i+1}</span><span>${p}</span></div>`).join('');
}
document.getElementById('p10-addPlayerBtn').onclick = p10AddPlayer;
document.getElementById('p10-newName').addEventListener('keydown', e=>{ if(e.key==='Enter') p10AddPlayer(); });
document.getElementById('p10-validateRound').onclick = p10ValidateRound;
document.getElementById('p10-resetBtn').onclick = ()=>{
  if(confirm('Réinitialiser la partie Phase 10 (joueurs et manches) ?')){
    state.phase10 = { players: [], rounds: [] }; calcState = {}; saveState(); renderPhase10();
  }
};
document.getElementById('p10-rulesToggle').onclick = ()=>{ document.getElementById('p10-rulesList').classList.toggle('open'); };

/* ============ UNO ============ */
function unoAddPlayer(){
  const input = document.getElementById('uno-newName');
  const name = input.value.trim();
  if(!name) return;
  state.uno.players.push({ id: uid(), name });
  input.value=''; saveState(); renderUno();
}
function unoRemovePlayer(id){
  state.uno.players = state.uno.players.filter(p=>p.id!==id);
  state.uno.rounds.forEach(r=>{ delete r.scores[id]; });
  saveState(); renderUno();
}
function unoTotalScore(pid){ return state.uno.rounds.reduce((s,r)=> s + (r.scores[pid]||0), 0); }
function unoCardValue(kind){ if(kind==='action') return 20; if(kind==='wild') return 50; return kind; }

function renderUno(){
  document.getElementById('uno-target').value = state.uno.target;
  document.getElementById('uno-target').onchange = (e)=>{
    state.uno.target = parseInt(e.target.value,10) || 500; saveState(); renderUno();
  };

  const zone = document.getElementById('uno-setupRow'); zone.innerHTML='';
  state.uno.players.forEach(p=>{
    const chip = document.createElement('div'); chip.className='playerchip';
    chip.innerHTML = `<span>${escapeHtml(p.name)}</span>`;
    const del = document.createElement('button'); del.innerHTML='&times;';
    del.onclick = ()=>unoRemovePlayer(p.id);
    chip.appendChild(del); zone.appendChild(chip);
  });

  const ladderCard = document.getElementById('uno-ladderCard');
  const ladderZone = document.getElementById('uno-ladderZone');
  ladderZone.innerHTML='';
  if(state.uno.players.length===0){ ladderCard.style.display='none'; }
  else{
    ladderCard.style.display='block';
    const ranked = [...state.uno.players].sort((a,b)=> unoTotalScore(b.id) - unoTotalScore(a.id));
    ranked.forEach(p=>{
      const score = unoTotalScore(p.id);
      const won = score >= state.uno.target;
      const row = document.createElement('div'); row.className='raceRow';
      const name = document.createElement('div'); name.className='raceName';
      name.innerHTML = escapeHtml(p.name) + (won ? '<span class="crown"><i class="ti ti-crown"></i></span>' : '');
      row.appendChild(name);
      const track = document.createElement('div'); track.className='raceTrack';
      const fill = document.createElement('div'); fill.className='raceFill';
      fill.style.width = Math.min(100, (score/state.uno.target)*100) + '%';
      track.appendChild(fill); row.appendChild(track);
      const scoreEl = document.createElement('div'); scoreEl.className='raceScore'; scoreEl.textContent = score;
      row.appendChild(scoreEl);
      ladderZone.appendChild(row);
    });
    const winner = state.uno.players.find(p=>unoTotalScore(p.id) >= state.uno.target);
    document.getElementById('uno-winnerZone').innerHTML = winner
      ? `<div class="winnerBanner">${escapeHtml(winner.name)} remporte la partie avec ${unoTotalScore(winner.id)} points</div>` : '';
  }

  const roundCard = document.getElementById('uno-roundCard');
  const winnerSelect = document.getElementById('uno-winnerSelect');
  const grid = document.getElementById('uno-roundGrid');
  grid.innerHTML='';
  if(state.uno.players.length<2){ roundCard.style.display='none'; }
  else{
    roundCard.style.display='block';
    winnerSelect.innerHTML = state.uno.players.map(p=>`<option value="${p.id}">${escapeHtml(p.name)} a gagné la manche</option>`).join('');
    const winnerId = winnerSelect.value;
    state.uno.players.forEach(p=>{
      if(p.id===winnerId) return;
      if(!calcState[p.id]) calcState[p.id] = { open:false, items:[] };
      const row = document.createElement('div'); row.className='roundPlayer';
      const name = document.createElement('div'); name.className='rname'; name.textContent = p.name;
      row.appendChild(name);
      const scoreWrap = document.createElement('div'); scoreWrap.style.display='flex';scoreWrap.style.alignItems='center';scoreWrap.style.gap='6px';scoreWrap.style.marginLeft='auto';
      const scoreInput = document.createElement('input'); scoreInput.type='number'; scoreInput.min='0'; scoreInput.className='scoreInput';
      scoreInput.id = 'uno-score-'+p.id; scoreInput.placeholder='0';
      scoreWrap.appendChild(scoreInput);
      const calcBtn = document.createElement('button'); calcBtn.type='button'; calcBtn.className='calcToggle'; calcBtn.textContent='calculer';
      calcBtn.onclick = ()=>{ calcState[p.id].open = !calcState[p.id].open; renderUno(); };
      scoreWrap.appendChild(calcBtn); row.appendChild(scoreWrap);

      const calcBox = document.createElement('div'); calcBox.className='calcBox' + (calcState[p.id].open ? ' open':'');
      const cardDefs = [0,1,2,3,4,5,6,7,8,9,'action','wild'];
      cardDefs.forEach(def=>{
        const btn = document.createElement('button'); btn.type='button';
        btn.className='cbtn' + (def==='action'?' skip':def==='wild'?' wild':'');
        const val = def==='action' ? 'action' : def==='wild' ? 'wild' : def;
        btn.textContent = def==='action' ? 'Action +20' : def==='wild' ? 'Joker +50' : def+'';
        btn.onclick = ()=>{ calcState[p.id].items.push(unoCardValue(val)); unoUpdateCalcSum(p.id); };
        calcBox.appendChild(btn);
      });
      const undoBtn = document.createElement('button'); undoBtn.type='button'; undoBtn.className='cbtn';
      undoBtn.innerHTML='<i class="ti ti-backspace"></i>';
      undoBtn.onclick = ()=>{ calcState[p.id].items.pop(); unoUpdateCalcSum(p.id); };
      calcBox.appendChild(undoBtn);
      const sum = document.createElement('span'); sum.className='calcSum'; sum.id = 'uno-sum-'+p.id;
      calcBox.appendChild(sum);
      row.appendChild(calcBox);
      grid.appendChild(row);
      unoUpdateCalcSum(p.id);
    });
  }

  const historyCard = document.getElementById('uno-historyCard');
  const table = document.getElementById('uno-historyTable');
  table.innerHTML='';
  if(state.uno.rounds.length===0 || state.uno.players.length===0){ historyCard.style.display='none'; }
  else{
    historyCard.style.display='block';
    const thead = document.createElement('tr');
    thead.innerHTML = '<th>Manche</th>' + state.uno.players.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('') + '<th></th>';
    table.appendChild(thead);
    state.uno.rounds.forEach((r,idx)=>{
      const tr = document.createElement('tr');
      let cells = `<td>${idx+1}</td>`;
      state.uno.players.forEach(p=>{
        const val = r.scores[p.id] || 0;
        const mark = p.id===r.winnerId ? ' <i class="ti ti-crown" style="color:var(--gold)"></i>' : '';
        cells += `<td>${val}${mark}</td>`;
      });
      cells += `<td><button class="roundDel" onclick="unoDeleteRound('${r.id}')"><i class="ti ti-trash"></i></button></td>`;
      tr.innerHTML = cells; table.appendChild(tr);
    });
    const totalTr = document.createElement('tr'); totalTr.className='totalrow';
    let totalCells = '<td>Total</td>';
    state.uno.players.forEach(p=> totalCells += `<td>${unoTotalScore(p.id)}</td>`);
    totalCells += '<td></td>'; totalTr.innerHTML = totalCells; table.appendChild(totalTr);
  }
}
function unoUpdateCalcSum(pid){
  const el = document.getElementById('uno-sum-'+pid); if(!el) return;
  const items = calcState[pid].items; const total = items.reduce((a,b)=>a+b,0);
  el.textContent = items.length ? `= ${total} pts (${items.length} carte${items.length>1?'s':''})` : '';
  const input = document.getElementById('uno-score-'+pid);
  if(input && items.length) input.value = total;
}
function unoValidateRound(){
  if(state.uno.players.length<2) return;
  const winnerSelect = document.getElementById('uno-winnerSelect');
  const winnerId = winnerSelect.value;
  const scores = {};
  let sum = 0;
  state.uno.players.forEach(p=>{
    if(p.id===winnerId) return;
    const scoreInput = document.getElementById('uno-score-'+p.id);
    const val = parseInt(scoreInput.value,10) || 0;
    scores[p.id] = 0;
    sum += val;
  });
  scores[winnerId] = sum;
  state.uno.rounds.push({ id: uid(), winnerId, scores });
  calcState = {}; saveState(); renderUno();
}
function unoDeleteRound(roundId){
  state.uno.rounds = state.uno.rounds.filter(r=>r.id!==roundId);
  saveState(); renderUno();
}
document.getElementById('uno-addPlayerBtn').onclick = unoAddPlayer;
document.getElementById('uno-newName').addEventListener('keydown', e=>{ if(e.key==='Enter') unoAddPlayer(); });
document.getElementById('uno-validateRound').onclick = unoValidateRound;
document.getElementById('uno-resetBtn').onclick = ()=>{
  if(confirm('Réinitialiser la partie Uno (joueurs et manches) ?')){
    state.uno = { players: [], rounds: [], target: 500 }; calcState = {}; saveState(); renderUno();
  }
};

/* ============ PETANQUE ============ */
function petAddPlayer(){
  const input = document.getElementById('pet-newName');
  const name = input.value.trim();
  if(!name) return;
  state.petanque.players.push({ id: uid(), name });
  input.value=''; saveState(); renderPetanque();
}
function petRemovePlayer(id){
  state.petanque.players = state.petanque.players.filter(p=>p.id!==id);
  state.petanque.rounds.forEach(r=>{ delete r.scores[id]; });
  saveState(); renderPetanque();
}
function petTotalScore(pid){ return state.petanque.rounds.reduce((s,r)=> s + (r.scores[pid]||0), 0); }

function renderPetanque(){
  const zone = document.getElementById('pet-setupRow'); zone.innerHTML='';
  state.petanque.players.forEach(p=>{
    const chip = document.createElement('div'); chip.className='playerchip';
    chip.innerHTML = `<span>${escapeHtml(p.name)}</span>`;
    const del = document.createElement('button'); del.innerHTML='&times;';
    del.onclick = ()=>petRemovePlayer(p.id);
    chip.appendChild(del); zone.appendChild(chip);
  });

  const ladderCard = document.getElementById('pet-ladderCard');
  const ladderZone = document.getElementById('pet-ladderZone');
  ladderZone.innerHTML='';
  if(state.petanque.players.length===0){ ladderCard.style.display='none'; }
  else{
    ladderCard.style.display='block';
    const ranked = [...state.petanque.players].sort((a,b)=> petTotalScore(b.id) - petTotalScore(a.id));
    ranked.forEach(p=>{
      const score = petTotalScore(p.id);
      const won = score >= 13;
      const row = document.createElement('div'); row.className='raceRow';
      const name = document.createElement('div'); name.className='raceName';
      name.innerHTML = escapeHtml(p.name) + (won ? '<span class="crown"><i class="ti ti-crown"></i></span>' : '');
      row.appendChild(name);
      const track = document.createElement('div'); track.className='raceTrack';
      const fill = document.createElement('div'); fill.className='raceFill';
      fill.style.width = Math.min(100, (score/13)*100) + '%';
      track.appendChild(fill); row.appendChild(track);
      const scoreEl = document.createElement('div'); scoreEl.className='raceScore'; scoreEl.textContent = score;
      row.appendChild(scoreEl);
      ladderZone.appendChild(row);
    });
    const winner = state.petanque.players.find(p=>petTotalScore(p.id) >= 13);
    document.getElementById('pet-winnerZone').innerHTML = winner
      ? `<div class="winnerBanner">${escapeHtml(winner.name)} remporte la partie avec ${petTotalScore(winner.id)} points</div>` : '';
  }

  const roundCard = document.getElementById('pet-roundCard');
  const grid = document.getElementById('pet-roundGrid');
  grid.innerHTML='';
  const alreadyWon = state.petanque.players.some(p=>petTotalScore(p.id) >= 13);
  if(state.petanque.players.length<2 || alreadyWon){ roundCard.style.display='none'; }
  else{
    roundCard.style.display='block';
    state.petanque.players.forEach(p=>{
      const row = document.createElement('div'); row.className='roundPlayer';
      const name = document.createElement('div'); name.className='rname'; name.textContent = p.name;
      row.appendChild(name);
      const scoreWrap = document.createElement('div'); scoreWrap.style.display='flex';scoreWrap.style.gap='4px';scoreWrap.style.marginLeft='auto';scoreWrap.style.flexWrap='wrap';
      for(let i=0;i<=6;i++){
        const btn = document.createElement('button'); btn.type='button'; btn.className='cbtn';
        btn.textContent = i===0 ? '0' : '+'+i;
        btn.dataset.pid = p.id; btn.dataset.val = i;
        btn.onclick = ()=>{
          grid.querySelectorAll(`button[data-pid="${p.id}"]`).forEach(b=>b.style.background='var(--felt-1)');
          btn.style.background = 'var(--gold)'; btn.style.color = 'var(--felt-0)';
          grid.dataset['sel-'+p.id] = i;
        };
        scoreWrap.appendChild(btn);
      }
      row.appendChild(scoreWrap);
      grid.appendChild(row);
    });
  }

  const historyCard = document.getElementById('pet-historyCard');
  const table = document.getElementById('pet-historyTable');
  table.innerHTML='';
  if(state.petanque.rounds.length===0 || state.petanque.players.length===0){ historyCard.style.display='none'; }
  else{
    historyCard.style.display='block';
    const thead = document.createElement('tr');
    thead.innerHTML = '<th>Mène</th>' + state.petanque.players.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('') + '<th></th>';
    table.appendChild(thead);
    state.petanque.rounds.forEach((r,idx)=>{
      const tr = document.createElement('tr');
      let cells = `<td>${idx+1}</td>`;
      state.petanque.players.forEach(p=>{ cells += `<td>${r.scores[p.id]||0}</td>`; });
      cells += `<td><button class="roundDel" onclick="petDeleteRound('${r.id}')"><i class="ti ti-trash"></i></button></td>`;
      tr.innerHTML = cells; table.appendChild(tr);
    });
    const totalTr = document.createElement('tr'); totalTr.className='totalrow';
    let totalCells = '<td>Total</td>';
    state.petanque.players.forEach(p=> totalCells += `<td>${petTotalScore(p.id)}</td>`);
    totalCells += '<td></td>'; totalTr.innerHTML = totalCells; table.appendChild(totalTr);
  }
}
function petValidateRound(){
  if(state.petanque.players.length<2) return;
  const grid = document.getElementById('pet-roundGrid');
  const scores = {};
  let anyScore = false;
  state.petanque.players.forEach(p=>{
    const val = parseInt(grid.dataset['sel-'+p.id],10) || 0;
    scores[p.id] = val;
    if(val>0) anyScore = true;
  });
  if(!anyScore){ alert('Sélectionne le score de la mène pour au moins une équipe.'); return; }
  state.petanque.rounds.push({ id: uid(), scores });
  saveState(); renderPetanque();
}
function petDeleteRound(roundId){
  state.petanque.rounds = state.petanque.rounds.filter(r=>r.id!==roundId);
  saveState(); renderPetanque();
}
document.getElementById('pet-addPlayerBtn').onclick = petAddPlayer;
document.getElementById('pet-newName').addEventListener('keydown', e=>{ if(e.key==='Enter') petAddPlayer(); });
document.getElementById('pet-validateRound').onclick = petValidateRound;
document.getElementById('pet-resetBtn').onclick = ()=>{
  if(confirm('Réinitialiser la partie de pétanque (équipes et mènes) ?')){
    state.petanque = { players: [], rounds: [] }; saveState(); renderPetanque();
  }
};

/* ============ SKYJO ============ */
function skyAddPlayer(){
  const input = document.getElementById('sky-newName');
  const name = input.value.trim();
  if(!name) return;
  state.skyjo.players.push({ id: uid(), name });
  input.value=''; saveState(); renderSkyjo();
}
function skyRemovePlayer(id){
  state.skyjo.players = state.skyjo.players.filter(p=>p.id!==id);
  state.skyjo.rounds.forEach(r=>{ delete r.scores[id]; });
  saveState(); renderSkyjo();
}
function skyTotalScore(pid){ return state.skyjo.rounds.reduce((s,r)=> s + (r.scores[pid]||0), 0); }

function renderSkyjo(){
  const zone = document.getElementById('sky-setupRow'); zone.innerHTML='';
  state.skyjo.players.forEach(p=>{
    const chip = document.createElement('div'); chip.className='playerchip';
    chip.innerHTML = `<span>${escapeHtml(p.name)}</span>`;
    const del = document.createElement('button'); del.innerHTML='&times;';
    del.onclick = ()=>skyRemovePlayer(p.id);
    chip.appendChild(del); zone.appendChild(chip);
  });

  const ladderCard = document.getElementById('sky-ladderCard');
  const ladderZone = document.getElementById('sky-ladderZone');
  ladderZone.innerHTML='';
  const gameOver = state.skyjo.players.some(p=>skyTotalScore(p.id) >= 100);
  if(state.skyjo.players.length===0){ ladderCard.style.display='none'; }
  else{
    ladderCard.style.display='block';
    const ranked = [...state.skyjo.players].sort((a,b)=> skyTotalScore(a.id) - skyTotalScore(b.id));
    const maxScore = Math.max(1, ...ranked.map(p=>skyTotalScore(p.id)));
    ranked.forEach((p,idx)=>{
      const score = skyTotalScore(p.id);
      const isLeader = gameOver && idx===0;
      const row = document.createElement('div'); row.className='raceRow';
      const name = document.createElement('div'); name.className='raceName';
      name.innerHTML = escapeHtml(p.name) + (isLeader ? '<span class="crown"><i class="ti ti-crown"></i></span>' : '');
      row.appendChild(name);
      const track = document.createElement('div'); track.className='raceTrack';
      const fill = document.createElement('div'); fill.className='raceFill';
      fill.style.width = Math.min(100, (score/Math.max(maxScore,100))*100) + '%';
      track.appendChild(fill); row.appendChild(track);
      const scoreEl = document.createElement('div'); scoreEl.className='raceScore'; scoreEl.textContent = score;
      row.appendChild(scoreEl);
      ladderZone.appendChild(row);
    });
    if(gameOver){
      const winner = ranked[0];
      document.getElementById('sky-winnerZone').innerHTML =
        `<div class="winnerBanner">${escapeHtml(winner.name)} remporte la partie avec ${skyTotalScore(winner.id)} points</div>`;
    } else {
      document.getElementById('sky-winnerZone').innerHTML = '';
    }
  }

  const roundCard = document.getElementById('sky-roundCard');
  const enderSelect = document.getElementById('sky-enderSelect');
  const grid = document.getElementById('sky-roundGrid');
  grid.innerHTML='';
  if(state.skyjo.players.length<2 || gameOver){ roundCard.style.display='none'; }
  else{
    roundCard.style.display='block';
    enderSelect.innerHTML = state.skyjo.players.map(p=>`<option value="${p.id}">${escapeHtml(p.name)} a fini la manche en premier</option>`).join('');
    state.skyjo.players.forEach(p=>{
      if(!calcState[p.id]) calcState[p.id] = { open:false, items:[] };
      const row = document.createElement('div'); row.className='roundPlayer';
      const name = document.createElement('div'); name.className='rname'; name.textContent = p.name;
      row.appendChild(name);
      const scoreWrap = document.createElement('div'); scoreWrap.style.display='flex';scoreWrap.style.alignItems='center';scoreWrap.style.gap='6px';scoreWrap.style.marginLeft='auto';
      const scoreInput = document.createElement('input'); scoreInput.type='number'; scoreInput.className='scoreInput';
      scoreInput.id = 'sky-score-'+p.id; scoreInput.placeholder='0';
      scoreWrap.appendChild(scoreInput);
      const calcBtn = document.createElement('button'); calcBtn.type='button'; calcBtn.className='calcToggle'; calcBtn.textContent='calculer';
      calcBtn.onclick = ()=>{ calcState[p.id].open = !calcState[p.id].open; renderSkyjo(); };
      scoreWrap.appendChild(calcBtn); row.appendChild(scoreWrap);

      const calcBox = document.createElement('div'); calcBox.className='calcBox' + (calcState[p.id].open ? ' open':'');
      const cardDefs = [-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12];
      cardDefs.forEach(def=>{
        const btn = document.createElement('button'); btn.type='button'; btn.className='cbtn';
        btn.textContent = def>0 ? '+'+def : def+'';
        btn.onclick = ()=>{ calcState[p.id].items.push(def); skyUpdateCalcSum(p.id); };
        calcBox.appendChild(btn);
      });
      const undoBtn = document.createElement('button'); undoBtn.type='button'; undoBtn.className='cbtn';
      undoBtn.innerHTML='<i class="ti ti-backspace"></i>';
      undoBtn.onclick = ()=>{ calcState[p.id].items.pop(); skyUpdateCalcSum(p.id); };
      calcBox.appendChild(undoBtn);
      const sum = document.createElement('span'); sum.className='calcSum'; sum.id = 'sky-sum-'+p.id;
      calcBox.appendChild(sum);
      row.appendChild(calcBox);
      grid.appendChild(row);
      skyUpdateCalcSum(p.id);
    });
  }

  const historyCard = document.getElementById('sky-historyCard');
  const table = document.getElementById('sky-historyTable');
  table.innerHTML='';
  if(state.skyjo.rounds.length===0 || state.skyjo.players.length===0){ historyCard.style.display='none'; }
  else{
    historyCard.style.display='block';
    const thead = document.createElement('tr');
    thead.innerHTML = '<th>Manche</th>' + state.skyjo.players.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('') + '<th></th>';
    table.appendChild(thead);
    state.skyjo.rounds.forEach((r,idx)=>{
      const tr = document.createElement('tr');
      let cells = `<td>${idx+1}</td>`;
      state.skyjo.players.forEach(p=>{
        const val = r.scores[p.id] || 0;
        const doubled = p.id===r.enderId && r.doubled;
        cells += `<td>${val}${doubled ? ' <span style="color:var(--red)">x2</span>' : ''}</td>`;
      });
      cells += `<td><button class="roundDel" onclick="skyDeleteRound('${r.id}')"><i class="ti ti-trash"></i></button></td>`;
      tr.innerHTML = cells; table.appendChild(tr);
    });
    const totalTr = document.createElement('tr'); totalTr.className='totalrow';
    let totalCells = '<td>Total</td>';
    state.skyjo.players.forEach(p=> totalCells += `<td>${skyTotalScore(p.id)}</td>`);
    totalCells += '<td></td>'; totalTr.innerHTML = totalCells; table.appendChild(totalTr);
  }
}
function skyUpdateCalcSum(pid){
  const el = document.getElementById('sky-sum-'+pid); if(!el) return;
  const items = calcState[pid].items; const total = items.reduce((a,b)=>a+b,0);
  el.textContent = items.length ? `= ${total} pts (${items.length} carte${items.length>1?'s':''})` : '';
  const input = document.getElementById('sky-score-'+pid);
  if(input && items.length) input.value = total;
}
function skyValidateRound(){
  if(state.skyjo.players.length<2) return;
  const enderId = document.getElementById('sky-enderSelect').value;
  const raw = {};
  state.skyjo.players.forEach(p=>{
    const scoreInput = document.getElementById('sky-score-'+p.id);
    raw[p.id] = parseInt(scoreInput.value,10) || 0;
  });
  const lowest = Math.min(...Object.values(raw));
  const tiedForLowest = Object.values(raw).filter(v=>v===lowest).length;
  const enderIsStrictLowest = raw[enderId] === lowest && tiedForLowest === 1;
  const doubled = !enderIsStrictLowest;
  const scores = {};
  Object.keys(raw).forEach(pid=>{ scores[pid] = raw[pid]; });
  if(doubled) scores[enderId] = raw[enderId] * 2;
  state.skyjo.rounds.push({ id: uid(), enderId, doubled, scores });
  calcState = {}; saveState(); renderSkyjo();
}
function skyDeleteRound(roundId){
  state.skyjo.rounds = state.skyjo.rounds.filter(r=>r.id!==roundId);
  saveState(); renderSkyjo();
}
document.getElementById('sky-addPlayerBtn').onclick = skyAddPlayer;
document.getElementById('sky-newName').addEventListener('keydown', e=>{ if(e.key==='Enter') skyAddPlayer(); });
document.getElementById('sky-validateRound').onclick = skyValidateRound;
document.getElementById('sky-resetBtn').onclick = ()=>{
  if(confirm('Réinitialiser la partie Skyjo (joueurs et manches) ?')){
    state.skyjo = { players: [], rounds: [] }; calcState = {}; saveState(); renderSkyjo();
  }
};

/* ============ GENERIC ENGINE (10 jeux) ============ */
function ensureGenericView(cfg){
  let el = document.getElementById('view-generic-'+cfg.id);
  if(el) return el;
  el = document.createElement('div');
  el.className = 'gameView';
  el.id = 'view-generic-'+cfg.id;
  const pw = cfg.playerWord === 'Équipe';
  el.innerHTML = `
    <button class="backBtn" data-back="1"><i class="ti ti-arrow-left"></i> Choisir un autre jeu</button>
    <div id="gen-${cfg.id}-winnerZone"></div>
    <div class="card">
      <h2><span class="num">1</span> ${pw ? 'Équipes' : 'Joueurs'}</h2>
      <div class="setupRow" id="gen-${cfg.id}-setupRow"></div>
      <div style="display:flex;gap:.6rem;">
        <input class="pinput" id="gen-${cfg.id}-newName" placeholder="${pw ? "Nom de l'équipe" : 'Prénom du joueur'}" maxlength="16" style="flex:2;">
        <button class="btn-gold" id="gen-${cfg.id}-addPlayerBtn">Ajouter</button>
      </div>
    </div>
    <div class="card" id="gen-${cfg.id}-ladderCard" style="display:none;">
      <h2><span class="num">2</span> Score</h2>
      <div id="gen-${cfg.id}-ladderZone"></div>
    </div>
    <div class="card" id="gen-${cfg.id}-roundCard" style="display:none;">
      <h2><span class="num">3</span> Nouveau : ${cfg.roundLabel}</h2>
      <div class="roundGrid" id="gen-${cfg.id}-roundGrid"></div>
      <div style="margin-top:1rem;display:flex;gap:.6rem;justify-content:flex-end;">
        <button class="btn-gold" id="gen-${cfg.id}-validateRound">Valider</button>
      </div>
    </div>
    <div class="card" id="gen-${cfg.id}-historyCard" style="display:none;">
      <h2><span class="num">4</span> Historique</h2>
      <div style="overflow-x:auto;"><table id="gen-${cfg.id}-historyTable"></table></div>
    </div>
    <div class="card">
      <h2><span class="num">?</span> Rappel des règles</h2>
      <div class="rulesSummary">
        ${cfg.rules.map(r=>`<div class="ruleBlock"><h3>${escapeHtml(r.t)}</h3><p>${escapeHtml(r.d)}</p></div>`).join('')}
      </div>
    </div>
    <div style="text-align:center;margin-top:1rem;">
      <button class="btn-red" id="gen-${cfg.id}-resetBtn">Réinitialiser cette partie</button>
    </div>
  `;
  document.querySelector('.wrap').appendChild(el);

  el.querySelector('[data-back]').addEventListener('click', ()=>goTo('menu'));
  document.getElementById(`gen-${cfg.id}-addPlayerBtn`).onclick = ()=>genAddPlayer(cfg);
  document.getElementById(`gen-${cfg.id}-newName`).addEventListener('keydown', e=>{ if(e.key==='Enter') genAddPlayer(cfg); });
  document.getElementById(`gen-${cfg.id}-validateRound`).onclick = ()=>genValidateRound(cfg);
  document.getElementById(`gen-${cfg.id}-resetBtn`).onclick = ()=>{
    if(confirm(`Réinitialiser la partie ${cfg.name} ?`)){
      state.generic[cfg.id] = { players:[], rounds:[] }; calcState = {}; saveState(); renderGeneric(cfg);
    }
  };
  return el;
}

function genAddPlayer(cfg){
  const input = document.getElementById(`gen-${cfg.id}-newName`);
  const name = input.value.trim();
  if(!name) return;
  state.generic[cfg.id].players.push({ id: uid(), name });
  input.value=''; saveState(); renderGeneric(cfg);
}
function genRemovePlayer(cfg, pid){
  state.generic[cfg.id].players = state.generic[cfg.id].players.filter(p=>p.id!==pid);
  state.generic[cfg.id].rounds.forEach(r=>{ delete r.scores[pid]; });
  saveState(); renderGeneric(cfg);
}
function genTotalScore(cfg, pid){
  return state.generic[cfg.id].rounds.reduce((s,r)=> s + (r.scores[pid]||0), 0);
}

function renderGeneric(cfg){
  const data = state.generic[cfg.id];
  const zone = document.getElementById(`gen-${cfg.id}-setupRow`);
  zone.innerHTML='';
  data.players.forEach(p=>{
    const chip = document.createElement('div'); chip.className='playerchip';
    chip.innerHTML = `<span>${escapeHtml(p.name)}</span>`;
    const del = document.createElement('button'); del.innerHTML='&times;';
    del.onclick = ()=>genRemovePlayer(cfg,p.id);
    chip.appendChild(del); zone.appendChild(chip);
  });

  const ladderCard = document.getElementById(`gen-${cfg.id}-ladderCard`);
  const ladderZone = document.getElementById(`gen-${cfg.id}-ladderZone`);
  ladderZone.innerHTML='';

  let gameOver = false;
  if(data.players.length===0){ ladderCard.style.display='none'; }
  else{
    ladderCard.style.display='block';
    const totals = {};
    data.players.forEach(p=> totals[p.id] = genTotalScore(cfg,p.id));

    if(cfg.targetExact){ gameOver = data.players.some(p=> totals[p.id] === cfg.target); }
    else if(cfg.target!=null){ gameOver = data.players.some(p=> totals[p.id] >= cfg.target); }

    const ranked = [...data.players].sort((a,b)=> cfg.win==='highest' ? totals[b.id]-totals[a.id] : totals[a.id]-totals[b.id]);
    const scaleMax = Math.max(1, cfg.target || 0, ...Object.values(totals).map(v=>Math.abs(v)));
    ranked.forEach((p,idx)=>{
      const score = totals[p.id];
      const isLeader = gameOver && idx===0;
      const row = document.createElement('div'); row.className='raceRow';
      const name = document.createElement('div'); name.className='raceName';
      name.innerHTML = escapeHtml(p.name) + (isLeader ? '<span class="crown"><i class="ti ti-crown"></i></span>' : '');
      row.appendChild(name);
      const track = document.createElement('div'); track.className='raceTrack';
      const fill = document.createElement('div'); fill.className='raceFill';
      const pct = Math.max(0, Math.min(100, (Math.abs(score)/scaleMax)*100));
      fill.style.width = pct + '%';
      track.appendChild(fill); row.appendChild(track);
      const scoreEl = document.createElement('div'); scoreEl.className='raceScore'; scoreEl.textContent = score;
      row.appendChild(scoreEl);
      ladderZone.appendChild(row);
    });

    document.getElementById(`gen-${cfg.id}-winnerZone`).innerHTML = gameOver
      ? `<div class="winnerBanner">${escapeHtml(ranked[0].name)} remporte la partie avec ${totals[ranked[0].id]} points</div>` : '';
  }

  const roundCard = document.getElementById(`gen-${cfg.id}-roundCard`);
  const grid = document.getElementById(`gen-${cfg.id}-roundGrid`);
  grid.innerHTML='';
  if(data.players.length===0 || gameOver){ roundCard.style.display='none'; }
  else{
    roundCard.style.display='block';
    data.players.forEach(p=>{
      const key = cfg.id+'-'+p.id;
      if(!calcState[key]) calcState[key] = { open:false, items:[] };
      const row = document.createElement('div'); row.className='roundPlayer';
      const name = document.createElement('div'); name.className='rname'; name.textContent = p.name;
      row.appendChild(name);
      const scoreWrap = document.createElement('div'); scoreWrap.style.display='flex';scoreWrap.style.alignItems='center';scoreWrap.style.gap='6px';scoreWrap.style.marginLeft='auto';
      const scoreInput = document.createElement('input'); scoreInput.type='number';
      if(!cfg.allowNegative) scoreInput.min='0';
      scoreInput.className='scoreInput'; scoreInput.id = `gen-${cfg.id}-score-${p.id}`; scoreInput.placeholder='0';
      scoreWrap.appendChild(scoreInput);
      if(cfg.calculatorValues){
        const calcBtn = document.createElement('button'); calcBtn.type='button'; calcBtn.className='calcToggle'; calcBtn.textContent='calculer';
        calcBtn.onclick = ()=>{ calcState[key].open = !calcState[key].open; renderGeneric(cfg); };
        scoreWrap.appendChild(calcBtn);
      }
      row.appendChild(scoreWrap);

      if(cfg.calculatorValues){
        const calcBox = document.createElement('div'); calcBox.className='calcBox' + (calcState[key].open ? ' open':'');
        cfg.calculatorValues.forEach(def=>{
          const btn = document.createElement('button'); btn.type='button'; btn.className='cbtn';
          btn.textContent = '+'+def;
          btn.onclick = ()=>{ calcState[key].items.push(def); genUpdateCalcSum(cfg,p.id); };
          calcBox.appendChild(btn);
        });
        const undoBtn = document.createElement('button'); undoBtn.type='button'; undoBtn.className='cbtn';
        undoBtn.innerHTML='<i class="ti ti-backspace"></i>';
        undoBtn.onclick = ()=>{ calcState[key].items.pop(); genUpdateCalcSum(cfg,p.id); };
        calcBox.appendChild(undoBtn);
        const sum = document.createElement('span'); sum.className='calcSum'; sum.id = `gen-${cfg.id}-sum-${p.id}`;
        calcBox.appendChild(sum);
        row.appendChild(calcBox);
      }
      grid.appendChild(row);
      if(cfg.calculatorValues) genUpdateCalcSum(cfg,p.id);
    });
  }

  const historyCard = document.getElementById(`gen-${cfg.id}-historyCard`);
  const table = document.getElementById(`gen-${cfg.id}-historyTable`);
  table.innerHTML='';
  if(data.rounds.length===0 || data.players.length===0){ historyCard.style.display='none'; }
  else{
    historyCard.style.display='block';
    const thead = document.createElement('tr');
    thead.innerHTML = '<th>#</th>' + data.players.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('') + '<th></th>';
    table.appendChild(thead);
    data.rounds.forEach((r,idx)=>{
      const tr = document.createElement('tr');
      let cells = `<td>${idx+1}</td>`;
      data.players.forEach(p=>{ cells += `<td>${r.scores[p.id]||0}</td>`; });
      cells += `<td><button class="roundDel" onclick="genDeleteRound('${cfg.id}','${r.id}')"><i class="ti ti-trash"></i></button></td>`;
      tr.innerHTML = cells; table.appendChild(tr);
    });
    const totalTr = document.createElement('tr'); totalTr.className='totalrow';
    let totalCells = '<td>Total</td>';
    data.players.forEach(p=> totalCells += `<td>${genTotalScore(cfg,p.id)}</td>`);
    totalCells += '<td></td>'; totalTr.innerHTML = totalCells; table.appendChild(totalTr);
  }
}
function genUpdateCalcSum(cfg, pid){
  const key = cfg.id+'-'+pid;
  const el = document.getElementById(`gen-${cfg.id}-sum-${pid}`); if(!el) return;
  const items = calcState[key].items; const total = items.reduce((a,b)=>a+b,0);
  el.textContent = items.length ? `= ${total} pts (${items.length})` : '';
  const input = document.getElementById(`gen-${cfg.id}-score-${pid}`);
  if(input && items.length) input.value = total;
}
function genValidateRound(cfg){
  const data = state.generic[cfg.id];
  if(data.players.length===0) return;
  const scores = {};
  data.players.forEach(p=>{
    const scoreInput = document.getElementById(`gen-${cfg.id}-score-${p.id}`);
    const raw = parseInt(scoreInput.value,10) || 0;
    if(cfg.bustReset != null){
      const prevTotal = genTotalScore(cfg,p.id);
      let newTotal = prevTotal + raw;
      if(newTotal > cfg.target) newTotal = cfg.bustReset;
      scores[p.id] = newTotal - prevTotal;
    } else {
      scores[p.id] = raw;
    }
  });
  data.rounds.push({ id: uid(), scores });
  calcState = {}; saveState(); renderGeneric(cfg);
}
function genDeleteRound(gameId, roundId){
  const cfg = findGenericCfg(gameId);
  state.generic[gameId].rounds = state.generic[gameId].rounds.filter(r=>r.id!==roundId);
  saveState(); renderGeneric(cfg);
}

renderMenuCards();
p10RenderRules();
loadState();