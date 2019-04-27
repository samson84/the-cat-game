import cloneDeep from 'lodash/cloneDeep';

export const breed = ({name = '', id = null} = {}) => ({name, id})

export const question = (
  {breeds = [], correctAnswer = null, images = {}} = {}
) => ({
    breeds: cloneDeep(breeds),
    correctAnswer,
    images: cloneDeep(images)
})

export const game = ({questions = []}) => (
  {questions: [...questions]}
)