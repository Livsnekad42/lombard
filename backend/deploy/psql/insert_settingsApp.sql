DELETE FROM public.settingapps;

INSERT INTO public.settingapps ("fieldName", description, value, system, "enable", "isPublic") VALUES
('prolongationState', 'Состояние функционала пролонгации', '', '1', '1', '0'),
('processingPercent', 'Процент процессинга 0.10 - 10%', '0.05', '1', '1', '0'),
('probePrice_585', 'Стоимость 585 пробы за один грамм', '10500', '1', '1', '1'),
('probePrice_750', 'Стоимость 585 пробы за один грамм', '13461', '1', '1', '1');

INSERT INTO public.contents ("componentName", content, "enable") VALUES
('prolongationState_disabled', 'Извините!В данный момент этот функционал не раблотает.', '1');