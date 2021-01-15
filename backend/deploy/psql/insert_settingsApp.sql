DELETE FROM public.settingapps;

INSERT INTO public.settingapps ("fieldName", description, value, system, "enable") VALUES 
('prolongationState','Состояние функционала пролонгации', '', '1', '1'),
('probePrice_585','Стоимость 585 пробы за один грамм', '10500', '1', '1'),
('probePrice_585','Стоимость 585 пробы за один грамм', '10500', '1', '1'),
('processingPercent','Процент процессинга 0.10 - 10%', '0.05', '1', '1');
