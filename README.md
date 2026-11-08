# TV Suggester

Приложение для поиска и просмотра сериалов на основе публичного API [TVmaze](https://www.tvmaze.com/api).

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple)

## Возможности

- **Поиск шоу** — фильтрацию выполняет сам API TVmaze (`/search/shows?q=...`).
- **Пагинация** — по 3 элемента на страницу, переключение страниц кнопками.
- **Фильтрация по жанрам** — уникальные жанры текущей выдачи отображаются кликабельными тегами (chips); фильтр можно сбросить.

## Решения по UX работы с запросами

- **Дебаунс** — запрос отправляется только после 400 мс паузы ввода, а не на каждую букву.
- **Отмена предыдущих запросов** — при новом запросе предыдущий отменяется через `AbortController`, устаревшие ответы игнорируются.
- **Состояние загрузки** — пока идёт запрос, отображается индикатор.
- **Ошибки** — сетевые сбои показываются с кнопкой «Повторить».
- Работа с запросами реализована вручную (`useEffect` + `fetch`), без `useQuery`.

## Архитектура

Код следует принципам **SimpleArchitecture** (см. `../SimpleArchitecture.md`):

- полное отделение логики от представления: компонент = импортированный `usePresenter()` + JSX;
- один компонент — одна папка (`Component.tsx`, `usePresenter.ts`, `Component.module.scss`);
- лимит 120 строк на файл, переиспользуемые компоненты — в `components`.

## Запуск локально

```bash
npm install
npm run dev
```

## Тесты и проверки

```bash
npm run test   # vitest (15 тестов: утилиты, хелперы, сценарии App)
npm run lint   # oxlint
npm run build  # type-check + production build
```

## Деплой на GitHub Pages (бесплатно)

В репозитории уже лежит workflow `.github/workflows/deploy.yml` — он собирает
проект и публикует `dist/` на GitHub Pages при каждом пуше в `main`.

1. Создайте репозиторий на GitHub и запушьте код:

   ```bash
   git remote add origin https://github.com/<ваш-логин>/<имя-репозитория>.git
   git push -u origin main
   ```

2. В GitHub откройте **Settings → Pages** и в разделе **Source** выберите
   **GitHub Actions**.

3. После завершения workflow (вкладка **Actions**) сайт будет доступен по адресу:

   ```
   https://<ваш-логин>.github.io/<имя-репозитория>/
   ```

Относительный `base: './'` в `vite.config.ts` уже настроен, поэтому приложение
работает на Pages независимо от имени репозитория.
