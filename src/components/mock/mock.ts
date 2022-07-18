export const mockTestCards = [
  {
    'id': 1,
    'name': 'Честер Bass',
    'vendorCode': 'SO757575',
    'type': 'electric',
    'description': 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    'previewImg': 'img/guitar-1.jpg',
    'stringCount': 6,
    'rating': 4,
    'price': 17500,
  },
  {
    'id': 2,
    'name': 'CURT Z300',
    'vendorCode': 'TK129049',
    'type': 'electric',
    'description': 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    'previewImg': 'img/guitar-8.jpg',
    'stringCount': 7,
    'rating': 3.5,
    'price': 29500,
  },
  {
    'id': 3,
    'name': 'Roman LX',
    'vendorCode': 'RO111111',
    'type': 'ukulele',
    'description': 'Укулеле класса премиум от компании CURT, собравшая в себе все самые необходимые качесва: лёгкость корпуса, прочность струн и компактный размер.',
    'previewImg': 'img/guitar-6.jpg',
    'stringCount': 4,
    'rating': 4,
    'price': 6800,
  },
];

export const mockTestCard ={
  'id': 1,
  'name': 'Честер Bass',
  'vendorCode': 'SO757575',
  'type': 'electric',
  'description': 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  'previewImg': 'img/guitar-1.jpg',
  'stringCount': 7,
  'rating': 4,
  'price': 17500,
};

export const mockCommentData = {
  guitarId: 1,
  userName: 'Mia',
  advantage: 'Cool',
  disadvantage: 'very nice',
  comment: 'not',
  rating: 3,
};

export const mockTestComments = [
  {
    'id': '2aa72cd8-41d6-4c7f-b111-0b92d750d5d8',
    'userName': 'Ксения',
    'advantage': 'Легкая в плане веса, изготовлена на много аккуратнее чем советские гитары.',
    'disadvantage': 'Не рекомендую!',
    'comment': 'Гитара пришла, за такие деньги неплохо, но гриф чуть кривой, изза этого звук в 5-3 струне звенит, для новичков сойдёт.',
    'rating': 4,
    'createAt': '2022-04-16T21:00:00.072Z',
    'guitarId': 1,
  },
  {
    'id': '410301b6-5893-4410-822a-5bb395aeb2b1',
    'userName': 'Паша',
    'advantage': 'Цена.',
    'disadvantage': 'Покрытие.',
    'comment': 'Гитара для начинающих,самое то.Но струны в комплекте-негодятся,от слова совсем.',
    'rating': 5,
    'createAt': '2022-03-14T21:00:00.072Z',
    'guitarId': 2,
  },
  {
    'id': '96eb6c49-8413-4336-95ae-8183b90a2e44',
    'userName': 'Паша',
    'advantage': 'Хорошо. Очень хорошо.',
    'disadvantage': 'Покрытие.',
    'comment': 'Неплохо, но дорого.',
    'rating': 4,
    'createAt': '2022-03-19T21:00:00.072Z',
    'guitarId': 2,
  },
];
