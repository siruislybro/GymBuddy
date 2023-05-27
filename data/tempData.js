import Category from "../models/Category";
import Exercise from "../models/Exercise";

export const CATEGORIES = [
  new Category('c1', 'Chest', '#f5428d'),
  new Category('c2', 'Back', '#f54242'),
];

export const EXERCISES = [
  new Exercise(
    'e1',
    ['c1'],
    'Push Ups',
    'A classic bodyweight exercise that targets the chest and triceps.',
    'easy',
    'To perform push ups, start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest almost touches the floor, then push back up to the starting position. Remember to keep your core engaged and maintain a straight line from head to heels throughout the movement.',
    'https://upload.wikimedia.org/wikipedia/commons/7/74/Push-ups-3-1.png',
  ),
  new Exercise(
    'e2',
    ['c1'],
    'Bench Press',
    'A staple in any weightlifting regimen, targets the chest and triceps.',
    'intermediate',
    'To perform the bench press, lie on a flat bench with your feet firmly planted on the ground. Grasp the barbell with a grip slightly wider than shoulder-width apart. Lower the barbell to your chest, then push it back up to the starting position. Ensure proper form and control throughout the movement, keeping your back flat and elbows tucked.',
    'https://upload.wikimedia.org/wikipedia/commons/2/23/Wide-grip-bench-press-2.png?20101108064843',
  ),
  new Exercise(
    'e3',
    ['c2'],
    'Pull Ups',
    'A bodyweight exercise that targets the back and biceps.',
    'intermediate',
    'To perform pull ups, grip an overhead bar with your palms facing away from you and your hands slightly wider than shoulder-width apart. Hang from the bar with your arms fully extended, then pull your body up until your chin reaches or goes above the bar. Lower yourself back down with control. Keep your core engaged and focus on using your back and bicep muscles to perform the movement.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pull_ups_2.svg/640px-Pull_ups_2.svg.png',
  ),
  new Exercise(
    'e4',
    ['c2'],
    'Deadlifts',
    'A compound movement that primarily targets the back and legs.',
    'hard',
    'To perform deadlifts, stand with your feet shoulder-width apart and the barbell on the floor in front of you. Bend at the hips and knees, keeping your back straight, and grip the barbell with your hands slightly wider than shoulder-width apart. Lift the barbell by extending your hips and knees, pulling your shoulders back, and standing up tall. Lower the barbell back to the floor with control. Focus on proper form, engage your core, and use your back and leg muscles to lift the weight.',
    'https://upload.wikimedia.org/wikipedia/commons/e/e8/Romanian-deadlift-1.png?20101106093919',
  ),
  // add more exercises here...
];
